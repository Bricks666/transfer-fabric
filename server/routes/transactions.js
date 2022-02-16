const { Router } = require("express");
const { TransactionsControllers } = require("../controllers");
const { accessVerify } = require("../middlewares");

const transactionsRouter = Router();
transactionsRouter.get(
	"/",
	accessVerify,
	TransactionsControllers.getTransactions
);
transactionsRouter.put(
	"/add",
	accessVerify,
	TransactionsControllers.addTransaction
);
transactionsRouter.post(
	"/accept",
	accessVerify,
	TransactionsControllers.acceptTransaction
);

transactionsRouter.post(
	"/cancel",
	accessVerify,
	TransactionsControllers.cancelTransaction
);

module.exports = transactionsRouter;
