const { TransactionsServices, ApiError } = require("../services");

module.exports = class TransactionsControllers {
	static async getTransactions(req, res, next) {
		try {
			const { user } = req.body;
			const transactions = await TransactionsServices.getTransactions(
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
			const { user, transactionId, keyword } = req.body;

			if (transactionId === undefined || !keyword) {
				throw ApiError.BadRequest(
					"TransactionId and keyword must be provided "
				);
			}

			const transaction = await TransactionsServices.acceptTransaction(
				user.login,
				user.org,
				transactionId,
				keyword
			);

			return res.json({ transaction });
		} catch (e) {
			next(e);
		}
	}

	static async cancelTransaction(req, res, next) {
		try {
			const { user, transactionId } = req.body;
			if (transactionId === undefined) {
				throw ApiError.BadRequest("TransactionId must be provided");
			}
			const transaction = await TransactionsServices.cancelTransaction(
				user.login,
				user.org,
				transactionId
			);

			return res.json({ transaction });
		} catch (e) {
			next(e);
		}
	}
};
