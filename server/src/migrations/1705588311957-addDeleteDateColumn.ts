import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeleteDateColumn1705588311957 implements MigrationInterface {
    name = 'AddDeleteDateColumn1705588311957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "deletedDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedDate" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "guild" ADD "deletedDate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild" DROP COLUMN "deletedDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deletedDate"`);
    }

}
