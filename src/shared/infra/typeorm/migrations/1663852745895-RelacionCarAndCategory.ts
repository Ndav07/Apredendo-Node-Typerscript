import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionCarAndCategory1663852745895 implements MigrationInterface {
    name = 'RelacionCarAndCategory1663852745895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b8f2af5403621c1527f4c76609f"`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "REL_b8f2af5403621c1527f4c76609"`);
        await queryRunner.query(`ALTER TABLE "specifications" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "specifications" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specifications" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "specifications" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b8f2af5403621c1527f4c76609f" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b8f2af5403621c1527f4c76609f"`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "specifications" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "specifications" ADD "description" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "specifications" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "specifications" ADD "name" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "REL_b8f2af5403621c1527f4c76609" UNIQUE ("categoryId")`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b8f2af5403621c1527f4c76609f" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "description" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "name" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

}
