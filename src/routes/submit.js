const express = require("express");

const submitRouter = express.Router();
const userMiddleWare = require("../middleware/userMiddleware");
const submitCode = require("../controllers/userSubmission");


submitRouter.post("/submit/:id", userMiddleWare, submitCode);


