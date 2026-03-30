const express = require("express");
const aiRouter = express.Router();
const userMiddleWare = require("../middleware/userMiddleware");
const solveDoubt = require("../controllers/solveDoubt");

aiRouter.post("/chat", userMiddleWare, solveDoubt);

module.exports = aiRouter;