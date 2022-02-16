const { Fabric } = require(".");
const { CONTRACTS, TRANSACTIONS } = require("../configs");

module.exports = class OffersServices {
	static async getOffers(login, org) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.GET_ALL
		);
	}

	static async addOffer(login, org, candidate) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.ADD,
			login,
			candidate
		);
	}

	static async voteFor(login, org, offerId) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.VOTE_FOR,
			login,
			offerId
		);
	}
	static async voteAgainst(login, org, offerId) {
		return await Fabric.transaction(
			login,
			org,
			CONTRACTS.OFFERS,
			TRANSACTIONS.OFFERS.VOTE_AGAINST,
			login,
			offerId
		);
	}
};
