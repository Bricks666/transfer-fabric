const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const { PORT, CONTRACTS, TRANSACTIONS } = require("./configs");
const { errorHandler } = require("./middlewares");
const { appRouter } = require("./routes");
const { Fabric } = require("./services");

const app = express();

app.use(
	express.json(),
	cookieParser(),
	cors({
		credentials: true,
		origin: "http://localhost:3000",
	})
);
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
	await Fabric.registrationIdentity("org1", "Admin1", "0000");
	await Fabric.registrationIdentity("org1", "Admin2", "0000");
	await Fabric.registrationIdentity("org1", "User1", "0000");
	await Fabric.registrationIdentity("org1", "User2", "0000");
	await Fabric.registrationIdentity("org1", "User3", "0000");
	await Fabric.registrationIdentity("org1", "User4", "0000");
	console.log("OK");
});
