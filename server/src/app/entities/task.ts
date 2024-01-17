import { Entity, Column } from "typeorm";
import Base from "./base";

@Entity()
export default class Task extends Base {
  @Column()
  text: string;

  @Column()
  status: string;
}
