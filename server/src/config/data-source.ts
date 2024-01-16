import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { PG_DB, PG_HOST, PG_PASS, PG_PORT, PG_USER } from "./envs";

import { User, Guild } from "../app/entity";

const ormConfigOptions: DataSourceOptions = {
  name: "default",
  type: "postgres",
  host: PG_HOST,
  username: PG_USER,
  password: PG_PASS,
  database: PG_DB,
  synchronize: false,
  logging: false,
  entities: [User, Guild],
  migrations: [],
  subscribers: [],
};

const AppDataSource = new DataSource(ormConfigOptions);

export { ormConfigOptions, AppDataSource };
