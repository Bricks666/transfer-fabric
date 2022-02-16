const { Fabric } = require(".");
const { CONTRACTS, TRANSACTIONS } = require("../configs");

module.exports = class CategoriesServices {
	static async getCategories(login, org) {
		return Fabric.transaction(
			login,
			org,
			CONTRACTS.CATEGORIES,
			TRANSACTIONS.CATEGORIES.GET_ALL
		);
	}

	static async addCategory(login, org, name) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.CATEGORIES,
			TRANSACTIONS.CATEGORIES.ADD,
			login,
			name
		);
	}
};
