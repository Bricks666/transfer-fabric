const { TransactionsServices, ApiError } = require("../services");

module.exports = class TransactionsControllers {
	static async getSendedTransactions(req, res, next) {
		try {
			const { user } = req.body;
			const transactions = await TransactionsServices.getSendedTransactions(
				user.login,
				user.org
			);

			return res.json({ transactions });
		} catch (e) {
			next(e);
		}
	}

	static async getReceivedTransactions(req, res, next) {
		try {
			const { user } = req.body;
			const transactions = await TransactionsServices.getReceivedTransactions(
				user.login,
				user.org
			);

			return res.json({ transactions });
		} catch (e) {
			next(e);
		}
	}

	static async addTransaction(req, res, next) {
		try {
			const { user, receiver, keyword, categoryId, description, money } =
				req.body;
			if (
				!receiver ||
				!keyword ||
				categoryId === undefined ||
				!description ||
				!money
			) {
				throw ApiError.BadRequest("Need more parameters");
			}
			const transaction = await TransactionsServices.addTransaction(
				user.login,
				user.org,
				receiver,
				keyword,
				categoryId,
				description,
				money
			);
			return res.json({ transaction });
		} catch (e) {
			next(e);
		}
	}

	static async acceptTransaction(req, res, next) {
		try {
			const { user, keyword } = req.body;
			const { id } = req.params;

			if (id === undefined || !keyword) {
				throw ApiError.BadRequest("id and keyword must be provided ");
			}

			const transaction = await TransactionsServices.acceptTransaction(
				user.login,
				user.org,
				id,
				keyword
			);

			return res.json({ transaction });
		} catch (e) {
			next(e);
		}
	}

	static async cancelTransaction(req, res, next) {
		try {
			const { user } = req.body;
			const { id } = req.params;
			if (id === undefined) {
				throw ApiError.BadRequest("id must be provided");
			}
			const transaction = await TransactionsServices.cancelTransaction(
				user.login,
				user.org,
				id
			);

			return res.json({ transaction });
		} catch (e) {
			next(e);
		}
	}
};
