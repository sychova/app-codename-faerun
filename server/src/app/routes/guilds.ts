import express from "express";

import authVerification from "../middlewares/authVerification";
import { guildsController } from "../controllers";

const guildsRouter = express.Router();

guildsRouter.get("/", guildsController.getAll);

// tasksRouter.get("/", authVerification, getTaskAll);
// tasksRouter.get("/:id", authVerification, getTaskById);

// tasksRouter.post("/", authVerification, createTask);

// tasksRouter.delete("/:id", authVerification, deleteTask);

// tasksRouter.put("/:id/complete", authVerification, completeTask);

export default guildsRouter;
