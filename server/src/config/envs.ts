import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const Env = {
  MONGO_URL: "mongodb://127.0.0.1:27017/sorcerous-sundries",
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 5000,
  TOKEN_KEY: "defaultSecretKey",
};

export = Env;
