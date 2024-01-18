import { taskService } from "../services";

const getTaskAll = async (req: any, res: any) => {
  try {
    const tasks = await taskService.getOwn(req.userId);

    res.json(tasks);
  } catch (error) {
    console.error(error);
  }
};

const getTaskById = async (req: any, res: any) => {
  try {
    const task = await taskService.getById(req.params.id);

    res.json(task);
  } catch (error) {
    console.error(error);
  }
};

const createTask = async (req: any, res: any) => {
  if (!req.body.text) {
    return res.status(400).json({
      status: false,
      message: "Task info is required",
    });
  }

  const newTask = await taskService.create({
    text: req.body.text,
    user: req.userId,
  });

  res.json(newTask);
};

const deleteTask = async (req: any, res: any) => {
  const task = await taskService.softDelete(req.params.id);

  res.json(task);
};

const completeTask = async (req: any, res: any) => {
  const task = await taskService.complete(req.params.id);

  res.json(task);
};

export { getTaskAll, getTaskById, createTask, deleteTask, completeTask };
