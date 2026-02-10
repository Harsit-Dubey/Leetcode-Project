const express = require("express");

const problemRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const createProblem = require("../controllers/userProblem")
// const userMiddleware = require("../middleware/userMiddleware")

problemRouter.post("/create", adminMiddleware, createProblem); //create
// problemRouter.patch("/:id", adminMiddleware, updateProblem); //update
// problemRouter.delete("/:id", adminMiddleware, deleteProblem); //delete


// problemRouter.get("/probleById/:id", userMiddleware, getProblemById); //Fetch
// problemRouter.get("/getAllProblem", userMiddleware, getAllProblem);//FetchAll
// problemRouter.get("/problemSolvedByUser", userMiddleware, solvedAllProblemByUser); //Fetch Solved Problem


module.exports = problemRouter;