const { ApiError, UsersServices, Tokes } = require("../services");
module.exports = class UsersControllers {
	static async login(req, res, next) {
		try {
			const { login } = req.body;

			if (!login) {
				throw ApiError.BadRequest("Login is require");
			}

			const user = await UsersServices.login(login, "0000");

			const accessToken = Tokes.sign({
				org: "org1",
				isAdmin: user.isAdmin,
				login,
			});

			res.json({ accessToken });
		} catch (e) {
			next(e);
		}
	}

	static async registration(req, res, next) {
		try {
			const { login } = req.body;
			if (!login) {
				throw ApiError.BadRequest("Login is require");
			}
			await UsersServices.registration(login, "0000");
			res.json({ resultCode: 0 });
		} catch (e) {
			next(e);
		}
	}

	static async getUser(req, res, next) {
		try {
			const { user } = req.body;

			const userInfo = await UsersServices.getUser(user.login, user.org);

			return res.json({ user:userInfo });
		} catch (e) {
			next(e);
		}
	}

	static async getUsers(req, res, next) {
		try {
			const { user } = req.body;

			const users = await UsersServices.getUsers(user.login, user.org);

			return res.json({ users });
		} catch (e) {
			next(e);
		}
	}
};
