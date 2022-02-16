const { Fabric } = require(".");
const { CONTRACTS, TRANSACTIONS } = require("../configs");

module.exports = class UsersServices {
	static async login(login, password, org = "org1") {
		await Fabric.loginIdentity(org, login, password);
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.USERS,
			TRANSACTIONS.USERS.GET_ONE,
			login
		);
	}

	static async registration(login, password, org = "org1") {
		await Fabric.registrationIdentity(org, login, password);
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.USERS,
			TRANSACTIONS.USERS.REG,
			login
		);
	}

	static async getUser(login, org) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.USERS,
			TRANSACTIONS.USERS.GET_ONE,
			login
		);
	}

	static async getUsers(login, org) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.USERS,
			TRANSACTIONS.USERS.GET_ALL
		);
	}
};
