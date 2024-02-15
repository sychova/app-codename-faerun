import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGuildEntity1705493904814 implements MigrationInterface {
  name = "CreateGuildEntity1705493904814";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "guild" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_cfbbd0a2805cab7053b516068a3" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "guild"`);
  }
}
