const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const { PORT, CONTRACTS, TRANSACTIONS } = require("./configs");
const { errorHandler } = require("./middlewares");
const { appRouter } = require("./routes");
const { Fabric } = require("./services");

const app = express();

app.use(express.json(), cookieParser(), cors());
app.use("/", appRouter);
app.use(errorHandler);

app.listen(PORT, async () => {
	const org = "org1";
	const login = "admin";
	await Fabric.loginIdentity(org, login, "adminpw");
	await Fabric.transaction(
		login,
		org,
		CONTRACTS.CATEGORIES,
		TRANSACTIONS.CATEGORIES.INIT
	);
	await Fabric.transaction(
		login,
		org,
		CONTRACTS.OFFERS,
		TRANSACTIONS.OFFERS.INIT
	);
	await Fabric.transaction(
		login,
		org,
		CONTRACTS.SAMPLES,
		TRANSACTIONS.SAMPLES.INIT
	);
	await Fabric.transaction(
		login,
		org,
		CONTRACTS.TRANSACTIONS,
		TRANSACTIONS.TRANSACTIONS.INIT
	);
	await Fabric.transaction(
		login,
		org,
		CONTRACTS.USERS,
		TRANSACTIONS.USERS.INIT
	);
	console.log("OK");
});
