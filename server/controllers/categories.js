const { CategoriesServices, ApiError } = require("../services");

module.exports = class CategoriesControllers {
	static async getCategories(req, res, next) {
		try {
			const { user } = req.body;
			const categories = await CategoriesServices.getCategories(
				user.login,
				user.org
			);

			return res.json({ categories });
		} catch (e) {
			next(e);
		}
	}

	static async addCategory(req, res, next) {
		try {
			const { user, categoryName } = req.body;

			if (!categoryName) {
				throw ApiError.BadRequest("Category name must be provided");
			}

			const category = await CategoriesServices.addCategory(
				user.login,
				user.org,
				categoryName
			);

			return res.json({ category });
		} catch (e) {
			next(e);
		}
	}
};
