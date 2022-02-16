const { Router } = require("express");
const { SamplesControllers } = require("../controllers");
const { accessVerify, adminVerify } = require("../middlewares");

const samplesRouter = Router();

samplesRouter.get("/", accessVerify, SamplesControllers.getSamples);
samplesRouter.put(
	"/add",
	accessVerify,
	adminVerify,
	SamplesControllers.addSample
);

module.exports = samplesRouter;
