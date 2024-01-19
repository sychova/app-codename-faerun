import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserGuildRelation1705620813366 implements MigrationInterface {
    name = 'AddUserGuildRelation1705620813366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "guildId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e697486fcd0379028accfd3ec7b" FOREIGN KEY ("guildId") REFERENCES "guild"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e697486fcd0379028accfd3ec7b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "guildId"`);
    }

}
