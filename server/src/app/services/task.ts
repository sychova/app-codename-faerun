import { AppDataSource } from "../../config/data-source";
import { Task } from "../entities";

const taskRepository = AppDataSource.getRepository(Task);

const getOwn = async (userId: any) => {
  const tasks = await taskRepository.findBy({ user: userId });

  return tasks;
};

const getById = async (taskId: any) => {
  const task = await taskRepository.findOneBy({ id: taskId });

  return task;
};

const create = async (newTaskData: any) => {
  const task = new Task();
  task.text = newTaskData.text;
  task.user = newTaskData.user;

  const newTask = await taskRepository.save(task);

  return newTask;
};

const softDelete = async (taskId: any) => {
  taskRepository
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id: taskId });

  return;
};

const complete = async (taskId: any) => {
  const task: any = await getById(taskId);

  task.isComplete = !task.isComplete;

  await taskRepository.save(task);

  return task;
};

export { getOwn, getById, create, softDelete, complete };
