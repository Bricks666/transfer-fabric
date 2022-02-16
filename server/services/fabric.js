const { Wallets, Gateway } = require("fabric-network");
const { readFileSync } = require("fs");
const { CHAINCODE, CHANNEL } = require("../configs");
const { fromBuffer } = require("../utils");
const { ApiError } = require(".");
const FabricCAServices = require("fabric-ca-client");

module.exports = class Fabric {
	static async transaction(login, org, contract, transaction, ...params) {
		const wallet = await this.createWallet(login, org);
		const gateway = await this.connectGateway(wallet, login, org);
		const channel = await gateway.getNetwork(CHANNEL);
		const contract = channel.getContract(CHAINCODE, contract);
		const bufferedResponse = await contract.submitTransaction(
			transaction,
			...params
		);

		gateway.disconnect();
		const response = fromBuffer(bufferedResponse);
		if (!Object.keys(response).length) {
			throw ApiError.BadRequest("Something went wrong in chaincode");
		}
		return response;
	}
	static async createWallet(login, org) {
		const walletPath = `./wallets/${org}/${login}`;
		return await Wallets.newFileSystemWallet(walletPath);
	}
	static async connectGateway(wallet, login, org) {
		const gateway = new Gateway();
		const cp = this.getConnectionProfile(org);

		await gateway.connect(cp, {
			identity: login,
			discovery: {
				asLocalhost: true,
				enabled: true,
			},
			wallet,
		});

		return gateway;
	}
	static getConnectionProfile(org) {
		const jsonProfile = readFileSync(`./gateway/connection-${org}.json`);
		return JSON.parse(jsonProfile);
	}

	static async getAdmin(org) {
		const login = "admin";
		const wallet = await this.createWallet(login, org);
		const identity = await wallet.get(login);

		if (!identity) {
			throw ApiError.BadRequest("Organization don't supported");
		}

		const provider = wallet.getProviderRegistry().getProvider(identity.type);
		return await provider.getUserContext(identity, login);
	}

	static async registrationIdentity(org, login, password) {
		const admin = this.getAdmin(org);
		const ca = this.createCA(org);
		await ca.register(
			{
				enrollmentID: login,
				enrollmentSecret: password,
				maxEnrollments: 2 ** 32,
			},
			admin
		);

		const enrollment = await ca.enroll({
			enrollmentID: login,
			enrollmentSecret: password,
		});

		const wallet = await this.createWallet(login, org);
		await wallet.put(login, this.createIdentity(org, enrollment));
	}
	static createCA(org) {
		const cp = this.getConnectionProfile(org);

		const ca = cp.certificateAuthorities[`ca.${org}.example.com`];
		const rootCa = ca.tlsCACerts.pem;

		return new FabricCAServices(
			ca.url,
			{
				trustedRoots: rootCa,
				verify: false,
			},
			ca.caName
		);
	}

	static createIdentity(org, enrollment) {
		const mspId = org[0].toUpperCase() + org.slice(1);
		return {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId,
			type: "X.509",
		};
	}

	static async loginIdentity(org, login, password) {
		const ca = this.createCA(org);

		const enrollment = await ca.enroll({
			enrollmentID: login,
			enrollmentSecret: password,
		});
		const wallet = await this.createWallet(login, org);
		await wallet.put(login, this.createIdentity(org, enrollment));
	}
};
