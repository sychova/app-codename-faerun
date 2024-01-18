import { Entity, Column, OneToMany } from "typeorm";

import Base from "./base";
import Task from "./task";

@Entity()
export default class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
