import { MigrationInterface, QueryRunner } from "typeorm";

export class TaskStatusColumToBoolean1705582371016 implements MigrationInterface {
    name = 'TaskStatusColumToBoolean1705582371016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "status" TO "isComplete"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "isComplete"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "isComplete" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "isComplete"`);
        await queryRunner.query(`ALTER TABLE "task" ADD "isComplete" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "task" RENAME COLUMN "isComplete" TO "status"`);
    }

}
