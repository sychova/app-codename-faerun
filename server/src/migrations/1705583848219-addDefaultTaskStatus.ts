import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultTaskStatus1705583848219 implements MigrationInterface {
    name = 'AddDefaultTaskStatus1705583848219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "isComplete" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "isComplete" DROP DEFAULT`);
    }

}
