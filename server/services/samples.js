const { Fabric } = require(".");
const { CONTRACTS, TRANSACTIONS } = require("../configs");

module.exports = class SamplesServices {
	static async getSamples(login, org) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.SAMPLES,
			TRANSACTIONS.SAMPLES.GET_ALL
		);
	}

	static async addSample(login, org, name, categoryId, money) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.SAMPLES,
			TRANSACTIONS.SAMPLES.ADD,
			login,
			name,
			categoryId,
			money
		);
	}
};
