const express = require("express")

const authRouter = express.Router();

//register
authRouter.post("/register", register);

//login
authRouter.post("login", login);

//logout
authRouter.post("logout", logout);

//getProfile
authRouter.get("getProfile", getProfile);