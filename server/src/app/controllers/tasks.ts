import { Task } from "../models/index.js";

const getTaskAll = async (req: any, res: any) => {
  try {
    const tasks = await Task.find({ user: req.userId });

    res.json(tasks);
  } catch (error) {
    console.error(error);
  }
};

const getTaskById = async (req: any, res: any) => {
  try {
    const task = await Task.findById(req.params.id);

    res.json(task);
  } catch (error) {
    console.error(error);
  }
};

const createTask = async (req: any, res: any) => {
  if (!req.body.text) {
    return res.status(400).json({
      status: false,
      message: "Quest info is required",
    });
  }

  const newTask = new Task({
    text: req.body.text,
    user: req.userId,
  });

  newTask.save();

  res.json(newTask);
};

const deleteTask = async (req: any, res: any) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  res.json(task);
};

const completeTask = async (req: any, res: any) => {
  const task = await Task.findById(req.params.id);

  task.status = !task.status;

  task.save();

  res.json(task);
};

export { getTaskAll, getTaskById, createTask, deleteTask, completeTask };
