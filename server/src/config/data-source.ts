import "reflect-metadata";
import { DataSourceOptions, DataSource } from "typeorm";
import { PG_DB, PG_HOST, PG_PASS, PG_USER } from "./envs";

const ormconfig: DataSourceOptions = {
  name: "default",
  type: "postgres",
  host: process.env.POSTGRES_HOST || PG_HOST,
  username: PG_USER,
  password: PG_PASS,
  database: PG_DB,
  synchronize: false,
  logging: false,
  entities: ["./dist/app/entities/*.{js,ts}"],
  migrations: ["./dist/migrations/*.{js,ts}"],
  subscribers: [],
};

const AppDataSource = new DataSource(ormconfig);

export { ormconfig, AppDataSource };
