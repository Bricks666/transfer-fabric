const { ApiError, Tokes } = require("../services");

module.exports = (req, res, next) => {
	try {
		const accessToken = req.headers.authorization?.split(" ")[1];

		if (!accessToken) {
			throw ApiError.NoAccess();
		}

		const user = Tokes.verify(accessToken);

		if (!user) {
			throw ApiError.NoAccess();
		}

		req.body.user = user;
		next();
	} catch (e) {
		next(e);
	}
};
