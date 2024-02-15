import { AppDataSource } from "../../config/data-source";
import { Guild } from "../entities";

const guildRepository = AppDataSource.getRepository(Guild);

const getAll = async () => {
  const guilds = await guildRepository.find({
    relations: {
      users: true,
    },
  });

  return guilds;
};

export { getAll };
