const express = require("express")

const authRouter = express.Router();
const { register, login, logout } = require("../controllers/userAuthent")
const userMiddleWare = require("../middleware/userMiddleware")

//register
authRouter.post("/register", register);
//login
authRouter.post("/login", login);
//logout
authRouter.post("/logout", userMiddleWare, logout);
//getProfile
// authRouter.get("getProfile", getProfile);


module.exports = authRouter;