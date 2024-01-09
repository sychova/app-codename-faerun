import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { authRouter, tasksRouter } from "./routes/index.js";
const { MONGO_URL, PORT } = process.env;

import authVerification from "./middlewares/authVerification.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successfully established!"))
  .catch(console.error);

app.use("/", authVerification, authRouter);
app.use("/tasks", authVerification, tasksRouter);

const port = PORT || 8080;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
