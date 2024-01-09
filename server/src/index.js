import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/index.js";
const { MONGO_URL, PORT } = process.env;

import { Task } from "./models/index.js";

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

//////////////////////////////////////////////////////////////////////////////
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();

  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = new Task({
    text: req.body.text,
  });

  newTask.save();

  res.json(newTask);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  res.json(task);
});

app.put("/tasks/:id/complete", async (req, res) => {
  const task = await Task.findById(req.params.id);

  task.status = !task.status;

  task.save();

  res.json(task);
});
//////////////////////////////////////////////////////////////////////////////

app.use("/", authRouter);

const port = PORT || 8080;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
