import { MigrationInterface, QueryRunner } from "typeorm";

export class default1666008242041 implements MigrationInterface {
    name = 'default1666008242041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "drive_license" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specifications" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "daily_rate" numeric NOT NULL, "available" boolean NOT NULL DEFAULT true, "license_plate" character varying NOT NULL, "fine_amount" numeric NOT NULL, "brand" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "categoryId" uuid NOT NULL, CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars_specifications_specifications" ("carsId" uuid NOT NULL, "specificationsId" uuid NOT NULL, CONSTRAINT "PK_24cf011b8f27f05239f91d65454" PRIMARY KEY ("carsId", "specificationsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c8472cb2f5271be69d719c87e7" ON "cars_specifications_specifications" ("carsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb1bd5294c5900559c4f1fa2d6" ON "cars_specifications_specifications" ("specificationsId") `);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_b8f2af5403621c1527f4c76609f" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars_specifications_specifications" ADD CONSTRAINT "FK_c8472cb2f5271be69d719c87e72" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars_specifications_specifications" ADD CONSTRAINT "FK_cb1bd5294c5900559c4f1fa2d6b" FOREIGN KEY ("specificationsId") REFERENCES "specifications"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars_specifications_specifications" DROP CONSTRAINT "FK_cb1bd5294c5900559c4f1fa2d6b"`);
        await queryRunner.query(`ALTER TABLE "cars_specifications_specifications" DROP CONSTRAINT "FK_c8472cb2f5271be69d719c87e72"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_b8f2af5403621c1527f4c76609f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb1bd5294c5900559c4f1fa2d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8472cb2f5271be69d719c87e7"`);
        await queryRunner.query(`DROP TABLE "cars_specifications_specifications"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "specifications"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
