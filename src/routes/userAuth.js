const express = require("express")

const authRouter = express.Router();
const { register, login, logout, adminRegister } = require("../controllers/userAuthent")
const userMiddleWare = require("../middleware/userMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware")

//register
authRouter.post("/register", register);
//login
authRouter.post("/login", login);
//logout
authRouter.post("/logout", userMiddleWare, logout);
//adminRegister
authRouter.post("/admin/register", adminMiddleware, adminRegister);
//getProfile
// authRouter.get("getProfile", getProfile);


module.exports = authRouter;