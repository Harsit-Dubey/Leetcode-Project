const express = require("express");

const problemRouter = express.Router();

//create
problemRouter.post("/create", problemCreate);

//update
problemRouter.patch("/:id", problemUpdate);

//delete
problemRouter.delete("/:id", problemDelete);

//Fetch
problemRouter.get("/:id", problemFetch);

//FetchAll
problemRouter.get("/", getAllProblem);

//Fetch Solved Problem
problemRouter.get("/user", solvedProblem)