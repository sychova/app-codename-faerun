import { Entity, Column, OneToMany } from "typeorm";

import Base from "./base";
import User from "./user";

@Entity()
export default class Guild extends Base {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.guild)
  users: User[];
}
