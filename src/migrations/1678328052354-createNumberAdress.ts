import { MigrationInterface, QueryRunner } from "typeorm";

export class createNumberAdress1678328052354 implements MigrationInterface {
    name = 'createNumberAdress1678328052354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "number" character varying(7)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "number"`);
    }

}
