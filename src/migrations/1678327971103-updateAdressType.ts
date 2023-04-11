import { MigrationInterface, QueryRunner } from "typeorm";

export class updateAdressType1678327971103 implements MigrationInterface {
    name = 'updateAdressType1678327971103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" ADD "number" character varying(7)`);
    }

}
