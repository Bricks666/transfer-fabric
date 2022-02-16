const { Router } = require("express");
const { accessVerify, adminVerify } = require("../middlewares");
const { CategoriesControllers } = require("../controllers");

const categoriesRouter = Router();

categoriesRouter.get("/", accessVerify, CategoriesControllers.getCategories);
categoriesRouter.put(
	"/add",
	accessVerify,
	adminVerify,
	CategoriesControllers.addCategory
);

module.exports = categoriesRouter;
