const { Router } = require("express");
const { TransactionsControllers } = require("../controllers");
const { accessVerify } = require("../middlewares");

const transactionsRouter = Router();
transactionsRouter.get(
	"/sended",
	accessVerify,
	TransactionsControllers.getSendedTransactions
);
transactionsRouter.get(
	"/received",
	accessVerify,
	TransactionsControllers.getReceivedTransactions
);
transactionsRouter.put(
	"/add",
	accessVerify,
	TransactionsControllers.addTransaction
);
transactionsRouter.post(
	"/:id/accept",
	accessVerify,
	TransactionsControllers.acceptTransaction
);

transactionsRouter.post(
	"/:id/cancel",
	accessVerify,
	TransactionsControllers.cancelTransaction
);

module.exports = transactionsRouter;
