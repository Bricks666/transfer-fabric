const { Router } = require("express");
const { OffersControllers } = require("../controllers");
const { accessVerify, adminVerify } = require("../middlewares");

const offersRouter = Router();

offersRouter.get("/", accessVerify, adminVerify, OffersControllers.getOffers);
offersRouter.put("/add", accessVerify, adminVerify, OffersControllers.addOffer);
offersRouter.post(
	"/:id/vote/for",
	accessVerify,
	adminVerify,
	OffersControllers.voteFor
);
offersRouter.post(
	"/:id/vote/against",
	accessVerify,
	adminVerify,
	OffersControllers.voteAgainst
);

module.exports = offersRouter;
