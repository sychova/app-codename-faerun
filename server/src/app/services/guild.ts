import { AppDataSource } from "../../config/data-source";
import { Guild } from "../entities";

const guildRepository = AppDataSource.getRepository(Guild);

// const userFetchByEmail = async (email: any) => {
//   const user = await userRepository.findOneBy({ email });

//   return user;
// };

// const userCreator = async (email: any, password: any) => {
//   const user = new User();
//   user.email = email;
//   user.password = await bcrypt.hash(password, 12);

//   const newUser = await userRepository.save(user);

//   return newUser;
// };

export {};
