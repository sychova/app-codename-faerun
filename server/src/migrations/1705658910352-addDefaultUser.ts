import { MigrationInterface, QueryRunner } from "typeorm";
import bcrypt from "bcryptjs";

export class AddDefaultUser1705658910352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hashedPassword = await bcrypt.hash("admin", 12);
    await queryRunner.query(
      `INSERT INTO "user" (email, password, "isAdmin", "guildId") VALUES ('admin@admin.admin', \'${hashedPassword}\', 'true', 1)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "user" WHERE email = 'admin@admin.admin'`
    );
  }
}
