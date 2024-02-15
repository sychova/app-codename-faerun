import { guildService } from "../services";

const getAll = async (req: any, res: any) => {
  try {
    const guilds = await guildService.getAll();

    res.json(guilds);
  } catch (error) {
    console.error(error);
  }
};

export { getAll };
