import express from "express";

import { register, login } from "../controllers/index.js";
import authVerification from "../middlewares/authVerification.js";

const authRouter = express.Router();

authRouter.post("/", authVerification);
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
