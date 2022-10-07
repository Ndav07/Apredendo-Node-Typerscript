import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRelationshipManyToManyInEntitiesCar1665153499572 implements MigrationInterface {
    name = 'ChangeRelationshipManyToManyInEntitiesCar1665153499572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_e80c1cfc74965cf923a89f9952b"`);
        await queryRunner.query(`CREATE TABLE "cars_specifications_specifications" ("carsId" uuid NOT NULL, "specificationsId" uuid NOT NULL, CONSTRAINT "PK_24cf011b8f27f05239f91d65454" PRIMARY KEY ("carsId", "specificationsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c8472cb2f5271be69d719c87e7" ON "cars_specifications_specifications" ("carsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb1bd5294c5900559c4f1fa2d6" ON "cars_specifications_specifications" ("specificationsId") `);
        await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "specificationId"`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars_specifications_specifications" ADD CONSTRAINT "FK_c8472cb2f5271be69d719c87e72" FOREIGN KEY ("carsId") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cars_specifications_specifications" ADD CONSTRAINT "FK_cb1bd5294c5900559c4f1fa2d6b" FOREIGN KEY ("specificationsId") REFERENCES "specifications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars_specifications_specifications" DROP CONSTRAINT "FK_cb1bd5294c5900559c4f1fa2d6b"`);
        await queryRunner.query(`ALTER TABLE "cars_specifications_specifications" DROP CONSTRAINT "FK_c8472cb2f5271be69d719c87e72"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2022-10-07 13:21:21.687976'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '2022-10-07 13:21:21.687976'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT '2022-10-07 13:21:21.687976'`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT '2022-10-07 13:21:21.687976'`);
        await queryRunner.query(`ALTER TABLE "cars" ADD "specificationId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb1bd5294c5900559c4f1fa2d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c8472cb2f5271be69d719c87e7"`);
        await queryRunner.query(`DROP TABLE "cars_specifications_specifications"`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_e80c1cfc74965cf923a89f9952b" FOREIGN KEY ("specificationId") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
