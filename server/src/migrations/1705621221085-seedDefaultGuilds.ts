import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDefaultGuilds1705621221085 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO guild (name, description) VALUES ('Default', 'This is a default guild.')`
    );
    await queryRunner.query(
      `INSERT INTO guild (name, description) VALUES ('Thieves Guild', 'The Thieves Guild can trace its lineage to a criminal organization in Hammerfall.')`
    );
    await queryRunner.query(
      `INSERT INTO guild (name, description) VALUES ('Dark Brotherhood', 'The Dark Brotherhood is a guild of assassins that kill targets for money in service of the deity Sithis.')`
    );
    await queryRunner.query(
      `INSERT INTO guild (name, description) VALUES ('Mages Guild', 'The Mages Guild was founded to help educate and train people about magic.')`
    );
    await queryRunner.query(
      `INSERT INTO guild (name, description) VALUES ('Fighters Guild', 'The Fighters Guild is a guild dedicated to the various combat arts and to the mercenary business, offering its services for a payment.')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM guild WHERE name = 'Default'`);
    await queryRunner.query(`DELETE FROM guild WHERE name = 'Thieves Guild'`);
    await queryRunner.query(
      `DELETE FROM guild WHERE name = 'Dark Brotherhood'`
    );
    await queryRunner.query(`DELETE FROM guild WHERE name = 'Mages Guild'`);
    await queryRunner.query(`DELETE FROM guild WHERE name = 'Fighters Guild'`);
  }
}
