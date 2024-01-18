import express from "express";

import { auth } from "../controllers";

const authRouter = express.Router();

authRouter.post("/registration", auth.register);
authRouter.post("/login", auth.login);

export default authRouter;
