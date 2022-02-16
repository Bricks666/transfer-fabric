const { Router } = require("express");
const { UsersControllers } = require("../controllers");
const { accessVerify } = require("../middlewares");

const userRouter = Router();

userRouter.post("/login", UsersControllers.login);
userRouter.put("/registration", UsersControllers.registration);
userRouter.get("/me", accessVerify, UsersControllers.getUser);
userRouter.get("/all", accessVerify, UsersControllers.getUsers);

module.exports = userRouter;
