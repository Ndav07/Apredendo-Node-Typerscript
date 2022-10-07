import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSpecificationInCar1665148793897 implements MigrationInterface {
    name = 'UpdateSpecificationInCar1665148793897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" ADD "specificationId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b8f2af5403621c1527f4c76609f"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b8f2af5403621c1527f4c76609f" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_e80c1cfc74965cf923a89f9952b" FOREIGN KEY ("specificationId") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_e80c1cfc74965cf923a89f9952b"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b8f2af5403621c1527f4c76609f"`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '2022-10-06 13:48:54.668394'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT '2022-10-06 13:48:54.668394'`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b8f2af5403621c1527f4c76609f" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT '2022-10-06 13:48:54.668394'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2022-10-06 13:48:54.668394'`);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "specificationId"`);
    }

}
