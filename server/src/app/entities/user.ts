import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import Base from "./base";
import Task from "./task";
import Guild from "./guild";

@Entity()
export default class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @ManyToOne(() => Guild, (guild) => guild.users)
  guild: Guild;
}
