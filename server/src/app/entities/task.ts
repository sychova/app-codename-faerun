import { Entity, Column, ManyToOne } from "typeorm";

import Base from "./base";
import User from "./user";

@Entity()
export default class Task extends Base {
  @Column()
  text: string;

  @Column()
  isComplete: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
