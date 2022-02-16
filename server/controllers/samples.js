const { SamplesServices } = require("../services");

module.exports = class SamplesControllers {
	static async getSamples(req, res, next) {
		try {
			const { user } = req.body;
			const samples = await SamplesServices.getSamples(user.login, user.org);
			return res.json({ samples });
		} catch (e) {
			next(e);
		}
	}

	static async addSample(req, res, next) {
		try {
			const { user, sampleName, categoryId, money } = req.body;
			const sample = await SamplesServices.addSample(
				user.login,
				user.org,
				sampleName,
				categoryId,
				money
			);

			return res.json({ sample });
		} catch (e) {
			next(e);
		}
	}
};
