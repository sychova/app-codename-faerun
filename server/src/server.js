const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Task = require("./models/Task");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/sorcerous-sundries", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to db"))
  .catch(console.error);

// routes
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

const port = 5000; // process.env.PORT || 8080;

app.listen(port, () =>
  console.log(`App listening on http://localhost:${port}`)
);
