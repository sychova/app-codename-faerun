import { taskService } from "../services";

const getAll = async (req: any, res: any) => {
  try {
    const tasks = await taskService.getOwn(req.user.userId);

    res.json(tasks);
  } catch (error) {
    console.error(error);
  }
};

const getById = async (req: any, res: any) => {
  try {
    const task = await taskService.getById(req.params.id);

    res.json(task);
  } catch (error) {
    console.error(error);
  }
};

const create = async (req: any, res: any) => {
  if (!req.body.text) {
    return res.status(400).json({
      status: false,
      message: "Task info is required",
    });
  }

  const newTask = await taskService.create({
    text: req.body.text,
    user: req.user.userId,
  });

  res.json(newTask);
};

const softDelete = async (req: any, res: any) => {
  const task = await taskService.softDelete(req.params.id);

  res.json(task);
};

const complete = async (req: any, res: any) => {
  const task = await taskService.complete(req.params.id);

  res.json(task);
};

export { getAll, getById, create, softDelete, complete };
