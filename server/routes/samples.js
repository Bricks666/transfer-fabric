const { Router } = require("express");
const { SamplesServices } = require("../services");
const { accessVerify, adminVerify } = require("../middlewares");

const samplesRouter = Router();

samplesRouter.get("/", accessVerify, SamplesServices.getSamples);
samplesRouter.put("/add", accessVerify, adminVerify, SamplesServices.addSample);

module.exports = samplesRouter;
