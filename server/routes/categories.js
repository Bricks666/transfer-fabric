const { Router } = require("express");
const { accessVerify, adminVerify } = require("../middlewares");
const { CategoriesServices } = require("../services");

const categoriesRouter = Router();

categoriesRouter.get("/", accessVerify, CategoriesServices.getCategories);
categoriesRouter.put(
	"/add",
	accessVerify,
	adminVerify,
	CategoriesServices.addCategory
);

module.exports = categoriesRouter;
