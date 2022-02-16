const { Router } = require("express");
const { OffersControllers } = require("../controllers");
const { accessVerify, adminVerify } = require("../middlewares");

const offersRouter = Router();

offersRouter.use(accessVerify, adminVerify);
offersRouter.get("/", OffersControllers.getOffers);
offersRouter.put("/add", OffersControllers.addOffer);
offersRouter.post("/:id/vote/for", OffersControllers.voteFor);
offersRouter.post("/:id/vote/against", OffersControllers.voteAgainst);

module.exports = offersRouter;
