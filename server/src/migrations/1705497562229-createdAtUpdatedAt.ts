import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedAtUpdatedAt1705497562229 implements MigrationInterface {
    name = 'CreatedAtUpdatedAt1705497562229'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "task" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "guild" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "guild" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guild" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "guild" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "createdDate"`);
    }

}
