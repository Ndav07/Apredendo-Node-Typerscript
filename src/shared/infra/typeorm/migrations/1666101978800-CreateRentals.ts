import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRentals1666101978800 implements MigrationInterface {
    name = 'CreateRentals1666101978800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rentals" ("id" uuid NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "expected_return_date" TIMESTAMP NOT NULL, "total" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "updated_at" TIMESTAMP NOT NULL DEFAULT 'now()', "carId" uuid, "userId" uuid, CONSTRAINT "REL_7e07037bddbd4c16a105cbd904" UNIQUE ("carId"), CONSTRAINT "REL_ffe1d7b0b58588566795452251" UNIQUE ("userId"), CONSTRAINT "PK_2b10d04c95a8bfe85b506ba52ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars_image" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_7e07037bddbd4c16a105cbd904f" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rentals" ADD CONSTRAINT "FK_ffe1d7b0b585885667954522513" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_ffe1d7b0b585885667954522513"`);
        await queryRunner.query(`ALTER TABLE "rentals" DROP CONSTRAINT "FK_7e07037bddbd4c16a105cbd904f"`);
        await queryRunner.query(`ALTER TABLE "cars_image" ALTER COLUMN "created_at" SET DEFAULT '2022-10-18 13:20:50.030981'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT '2022-10-18 13:20:50.030981'`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT '2022-10-18 13:20:50.030981'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '2022-10-18 13:20:50.030981'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2022-10-18 13:20:50.030981'`);
        await queryRunner.query(`DROP TABLE "rentals"`);
    }

}
