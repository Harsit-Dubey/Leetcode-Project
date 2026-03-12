const express = require("express");

const problemRouter = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware");
const { createProblem, updateProblem, deleteProblem, getProblemById, getAllProblem, solvedAllProblemByUser, submittedProblem } = require("../controllers/userProblem")
const userMiddleware = require("../middleware/userMiddleware")

problemRouter.post("/create", adminMiddleware, createProblem); //create
problemRouter.put("/update/:id", adminMiddleware, updateProblem); //update
problemRouter.delete("/delete/:id", adminMiddleware, deleteProblem); //delete


problemRouter.get("/problemById/:id", userMiddleware, getProblemById); //Fetch
problemRouter.get("/getAllProblem", userMiddleware, getAllProblem);//FetchAll
problemRouter.get("/problemSolvedByUser", userMiddleware, solvedAllProblemByUser); //Fetch Solved Problem
problemRouter.get("/submittedProblem/:pid", userMiddleware, submittedProblem)


module.exports = problemRouter;