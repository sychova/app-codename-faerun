import express from "express";

import authVerification from "../middlewares/authVerification";
import { guildsController } from "../controllers";

const guildsRouter = express.Router();

guildsRouter.get("/", guildsController.getAll);

export default guildsRouter;
