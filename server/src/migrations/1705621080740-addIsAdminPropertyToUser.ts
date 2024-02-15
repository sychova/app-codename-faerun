import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsAdminPropertyToUser1705621080740
  implements MigrationInterface
{
  name = "AddIsAdminPropertyToUser1705621080740";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isAdmin" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdmin"`);
  }
}
