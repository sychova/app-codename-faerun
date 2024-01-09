import express from "express";

import {
  getTaskAll,
  getTaskById,
  createTask,
  deleteTask,
  completeTask,
} from "../controllers/index.js";

const tasksRouter = express.Router();

tasksRouter.get("/", getTaskAll);
tasksRouter.get("/:id", getTaskById);

tasksRouter.post("/", createTask);

tasksRouter.delete("/:id", deleteTask);

tasksRouter.put("/:id/complete", completeTask);

export default tasksRouter;
