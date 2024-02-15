import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const Env = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  TOKEN_KEY: process.env.TOKEN_KEY,

  PG_HOST: process.env.PG_HOST,
  PG_PORT: process.env.PG_PORT,
  PG_USER: process.env.PG_USER,
  PG_PASS: process.env.PG_PASS,
  PG_DB: process.env.PG_DB,
};

export = Env;
