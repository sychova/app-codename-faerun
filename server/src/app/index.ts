import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { authRouter, tasksRouter } from "./routes";
import { MONGO_URL, PORT } from "../config/envs";

import authVerification from "./middlewares/authVerification";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("DB connection successfully established!"))
  .catch(console.error);

app.post("/", authVerification, (req: Request, res: Response) =>
  res.status(200)
);
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

const port = PORT || 8080;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
