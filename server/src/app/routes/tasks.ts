import express from "express";

import authVerification from "../middlewares/authVerification";
import { tasksController } from "../controllers";

const tasksRouter = express.Router();

tasksRouter.get("/", authVerification, tasksController.getAll);
tasksRouter.get("/:id", authVerification, tasksController.getById);

tasksRouter.post("/", authVerification, tasksController.create);

tasksRouter.delete("/:id", authVerification, tasksController.softDelete);

tasksRouter.put("/:id/complete", authVerification, tasksController.complete);

export default tasksRouter;
