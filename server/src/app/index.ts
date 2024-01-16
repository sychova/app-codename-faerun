import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { authRouter, tasksRouter } from "./routes";
import { PORT } from "../config/envs";
import { createDatabase } from "typeorm-extension";

import { ormConfigOptions, AppDataSource } from "../config/data-source";
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

(async () => {
  await createDatabase({ options: ormConfigOptions, ifNotExist: true });
  await AppDataSource.initialize();
})();

// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } as ConnectOptions)
//   .then(() => console.log("DB connection successfully established!"))
//   .catch(console.error);

app.post("/", authVerification, (req: Request, res: Response) =>
  res.status(200)
);
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);

const port = PORT || 5000;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
