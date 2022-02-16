const { OffersServices, ApiError } = require("../services");

module.exports = class OffersControllers {
	static async getOffers(req, res, next) {
		try {
			const { user } = req.body;
			const offers = await OffersServices.getOffers(user.login, user.org);
			return res.json({ offers });
		} catch (e) {
			next(e);
		}
	}
	static async addOffer(req, res, next) {
		try {
			const { user, candidate } = req.body;
			if (!candidate) {
				throw ApiError.BadRequest("Candidate");
			}
			const offer = await OffersServices.addOffer(
				user.login,
				user.org,
				candidate
			);

			return res.json({ offer });
		} catch (e) {
			next(e);
		}
	}
	static async voteFor(req, res, next) {
		try {
			const { user } = req.body;
			const { id: offerId } = req.params;
			if (!offerId) {
				throw ApiError.BadRequest("offerId");
			}
			const offer = await OffersServices.voteFor(user.login, user.org, offerId);

			return res.json({ offer });
		} catch (e) {
			next(e);
		}
	}
	static async voteAgainst(req, res, next) {
		try {
			const { user } = req.body;
			const { id: offerId } = req.params;

			if (!offerId) {
				throw ApiError.BadRequest("offerId");
			}
			const offer = await OffersServices.voteAgainst(
				user.login,
				user.org,
				offerId
			);

			return res.json({ offer });
		} catch (e) {
			next(e);
		}
	}
};
