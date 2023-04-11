import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRealEstateDecorator1678327007367 implements MigrationInterface {
    name = 'updateRealEstateDecorator1678327007367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "sold" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "sold" DROP DEFAULT`);
    }

}
