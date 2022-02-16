const { Router } = require("express");
const userRouter = require("./user");
const transactionRouter = require("./transactions");
const samplesRouter = require("./samples");
const categoriesRouter = require("./categories");
const offersRouter = require("./offers");

const appRouter = Router();

appRouter.use("/auth", userRouter);
appRouter.use("/transactions", transactionRouter);
appRouter.use("/samples", samplesRouter);
appRouter.use("/categories", categoriesRouter);
appRouter.use("/offers", offersRouter);

module.exports.appRouter = appRouter;
