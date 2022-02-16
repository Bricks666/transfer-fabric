const { Router } = require("express");
const UsersControllers = require("../controllers/user");

const userRouter = Router();

userRouter.post("/login", UsersControllers.login);
userRouter.put("/registration", UsersControllers.registration);

module.exports = userRouter;
