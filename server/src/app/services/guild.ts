import { AppDataSource } from "../../config/data-source";
import { Guild } from "../entities";

const guildRepository = AppDataSource.getRepository(Guild);

const getAll = async () => {
  const guilds = await guildRepository.find();

  return guilds;
};

export { getAll };
