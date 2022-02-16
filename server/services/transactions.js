const { Fabric } = require(".");
const { CONTRACTS, TRANSACTIONS } = require("../configs");

module.exports = class TransactionsServices {
	static async getSendedTransactions(login, org) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.TRANSACTIONS,
			TRANSACTIONS.TRANSACTIONS.GET_SENDED,
			login
		);
	}

	static async getReceivedTransactions(login, org) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.TRANSACTIONS,
			TRANSACTIONS.TRANSACTIONS.GET_RECEIVED,
			login
		);
	}

	static async addTransaction(
		login,
		org,
		loginReceiver,
		keyword,
		categoryId,
		description,
		money
	) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.TRANSACTIONS,
			TRANSACTIONS.TRANSACTIONS.ADD,
			login,
			loginReceiver,
			keyword,
			categoryId,
			description,
			money
		);
	}

	static async acceptTransaction(login, org, transactionId, keyword) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.TRANSACTIONS,
			TRANSACTIONS.TRANSACTIONS.ACCEPT,
			login,
			transactionId,
			keyword
		);
	}

	static async cancelTransaction(login, org, transactionId) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.TRANSACTIONS,
			TRANSACTIONS.TRANSACTIONS.CANCEL,
			login.transactionId
		);
	}
};
