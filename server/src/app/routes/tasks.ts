import express from "express";

import authVerification from "../middlewares/authVerification";
import {
  getTaskAll,
  getTaskById,
  createTask,
  deleteTask,
  completeTask,
} from "../controllers/index.js";

const tasksRouter = express.Router();

tasksRouter.get("/", authVerification, getTaskAll);
tasksRouter.get("/:id", authVerification, getTaskById);

tasksRouter.post("/", authVerification, createTask);

tasksRouter.delete("/:id", authVerification, deleteTask);

tasksRouter.put("/:id/complete", authVerification, completeTask);

export default tasksRouter;
