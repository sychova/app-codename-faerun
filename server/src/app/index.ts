import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { authRouter, tasksRouter, guildsRouter } from "./routes";
import { PORT } from "../config/envs";
import { createDatabase } from "typeorm-extension";

import { ormconfig, AppDataSource } from "../config/data-source";
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
  await createDatabase({
    options: ormconfig,
    ifNotExist: true,
  });

  AppDataSource.initialize()
    .then(async () => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
})();

app.post("/", authVerification, (req: any, res: any) => {
  res.json({ user: req.user });
});
app.use("/auth", authRouter);
app.use("/tasks", tasksRouter);
app.use("/guilds", guildsRouter);

const port = PORT || 5000;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
