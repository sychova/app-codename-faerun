import bcrypt from "bcryptjs";

import { AppDataSource } from "../../config/data-source";
import { User } from "../entities";

const userRepository = AppDataSource.getRepository(User);

const getById = async (userId: any) => {
  const user = await userRepository.findOneBy({ id: userId });

  return user;
};

const getByEmail = async (email: any) => {
  const user = await userRepository.findOneBy({ email });

  return user;
};

const create = async (email: any, password: any) => {
  const user = new User();
  user.email = email;
  user.password = await bcrypt.hash(password, 12);

  const newUser = await userRepository.save(user);

  return newUser;
};

export { getByEmail, create, getById };
