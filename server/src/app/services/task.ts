import { AppDataSource } from "../../config/data-source";
import { Task } from "../entities";

const taskRepository = AppDataSource.getRepository(Task);

const getOwn = async (userId: any) => {
  const tasks = await taskRepository.find({
    where: { user: userId },
    withDeleted: false,
  });

  return tasks;
};

const getById = async (taskId: any) => {
  const task = await taskRepository.findOne({ where: { id: taskId } });

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
  await taskRepository
    .createQueryBuilder()
    .softDelete()
    .where("id = :id", { id: taskId })
    .execute();

  const task = await taskRepository.findOne({
    where: { id: taskId },
    withDeleted: true,
  });

  return task;
};

const complete = async (taskId: any) => {
  const task: any = await getById(taskId);

  task.isComplete = !task.isComplete;

  await taskRepository.save(task);

  return task;
};

export { getOwn, getById, create, softDelete, complete };
