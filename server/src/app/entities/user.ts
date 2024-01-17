import { Entity, Column } from "typeorm";
import Base from "./base";

@Entity()
export default class User extends Base {
  @Column()
  email: string;

  @Column()
  password: string;
}
