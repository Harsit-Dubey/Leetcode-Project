const express = require("express");
const submitRouter = express.Router();
const userMiddleWare = require("../middleware/userMiddleware");
const { submitCode, runCode } = require("../controllers/userSubmission");


submitRouter.post("/submit/:id", userMiddleWare, submitCode);
submitRouter.post("/run/:id", userMiddleWare, runCode);


module.exports = submitRouter;


