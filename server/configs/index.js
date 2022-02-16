const PORT = 5000;
const COOKIE_NAME = "asddasdf";
const CHANNEL = "mychannel";
const CHAINCODE = "transfers";
const CONTRACTS = {
	CATEGORIES: "CategoryContract",
	SAMPLES: "SamplesContract",
	TRANSACTIONS: "TransactionsContract",
	USERS: "UsersContract",
	OFFERS: "OffersContract",
};

const TRANSACTIONS = {
	CATEGORIES: {
		INIT: "initializationContract",
		ADD: "addCategory" /* LOGIN(admin),name(categoryName) */,
		GET_ALL: "getCategories",
	},
	SAMPLES: {
		INIT: "initializationContract",
		ADD: "addSample" /* sender, name, category, money */,
		GET_ALL: "getSamples",
	},
	TRANSACTIONS: {
		INIT: "initializationContract",
		ADD: "addTransaction" /* sender, receiver, keyword, category, description, money */,
		ACCEPT: "acceptTransactions" /* sender, id, keyword */,
		CANCEL: "cancelTransaction" /* sender, id */,
    GET_BY_LOGIN: "getTransactionsLogin"
	},
	USERS: {
		INIT: "initializationContract",
		REG: "registration" /* login */,
		GET_ONE: "getUser" /* login */,
		GET_ALL: "getUsers",
	},
	OFFERS: {
		INIT: "initializationContract",
		ADD: "addOffer" /* adminLogin, candidate */,
		VOTE_FOR: "voteFor" /* voter, id */,
		VOTE_AGAINST: "voteAgainst" /* voter, id */,
		GET_ALL: "getOffers",
	},
};

module.exports = {
	COOKIE_NAME,
	CHAINCODE,
	CHANNEL,
	CONTRACTS,
	TRANSACTIONS,
	PORT,
};
