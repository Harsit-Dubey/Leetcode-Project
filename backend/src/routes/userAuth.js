const express = require("express")

const authRouter = express.Router();
const { register, login, logout, adminRegister, deleteProfile } = require("../controllers/userAuthent")
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
//deleteprofile
authRouter.delete('/deleteProfile', userMiddleWare, deleteProfile);
// authRouter.get("getProfile", getProfile);
authRouter.get('/check', userMiddleWare, (req, res) => {

  const reply = {
    firstName: req.result.firstName,
    emailId: req.result.emailId,
    _id: req.result._id,
    role: req.result.role,
  }

  res.status(200).json({
    user: reply,
    message: "Valid User"
  });
})


module.exports = authRouter;