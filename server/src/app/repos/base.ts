import { Repository } from "typeorm";

import { AppDataSource } from "../../config/data-source";
import { User } from "../entities";

export default class UserRepository extends Repository<User> {
  constructor(private userRepository: Repository<User>) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner
    );
  }

  async findByEmail(email: string): Promise<User> {
    return (await this.userRepository.findOneBy({ email })) as User;
  }
}
