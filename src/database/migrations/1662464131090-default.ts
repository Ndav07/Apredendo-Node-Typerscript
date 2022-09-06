import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662464131090 implements MigrationInterface {
    name = 'default1662464131090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying(30) NOT NULL, "description" character varying(300) NOT NULL, "created_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specifications" ("id" uuid NOT NULL, "name" character varying(30) NOT NULL, "description" character varying(300) NOT NULL, "created_at" date NOT NULL DEFAULT now(), CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "specifications"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
