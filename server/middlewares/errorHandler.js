const { ApiError } = require("../services");

module.exports = (err, req, res, next) => {
	if (err instanceof ApiError) {
		return res.status(err.status).json(err);
	}

	return res.status(500).json(err);
};
