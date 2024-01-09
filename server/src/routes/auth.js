import express from "express";

import { register, login } from "../controllers/index.js";

const authRouter = express.Router();

authRouter.post("/registration", register);
authRouter.post("/login", login);

export default authRouter;
