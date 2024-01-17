import "reflect-metadata";
import { DataSourceOptions, DataSource } from "typeorm";
import { PG_DB, PG_HOST, PG_PASS, PG_USER } from "./envs";

const ormconfig: DataSourceOptions = {
  name: "default",
  type: "postgres",
  host: PG_HOST,
  username: PG_USER,
  password: PG_PASS,
  database: PG_DB,
  synchronize: false,
  logging: false,
  entities: ["./src/app/entities/*.ts"],
  migrations: ["./src/migrations/*.ts"],
  subscribers: [],
};

const AppDataSource = new DataSource(ormconfig);

export { ormconfig, AppDataSource };
