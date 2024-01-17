import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Guild {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
