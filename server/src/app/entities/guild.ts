import { Entity, Column } from "typeorm";
import Base from "./base";

@Entity()
export default class Guild extends Base {
  @Column()
  name: string;

  @Column()
  description: string;
}
