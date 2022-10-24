import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTokens1666617105796 implements MigrationInterface {
    name = 'CreateUsersTokens1666617105796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_tokens" ("id" uuid NOT NULL, "refresh_token" character varying NOT NULL, "expires_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT 'now()', "userId" uuid, CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars_image" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "start_date" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "created_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "updated_at" SET DEFAULT 'now()'`);
        await queryRunner.query(`ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_e6885dc515299ebc5f78150e14c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_e6885dc515299ebc5f78150e14c"`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "updated_at" SET DEFAULT '2022-10-19 14:44:58.952532'`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "created_at" SET DEFAULT '2022-10-19 14:44:58.952532'`);
        await queryRunner.query(`ALTER TABLE "rentals" ALTER COLUMN "start_date" SET DEFAULT '2022-10-19 14:44:58.952532'`);
        await queryRunner.query(`ALTER TABLE "cars" ALTER COLUMN "created_at" SET DEFAULT '2022-10-19 14:44:58.952532'`);
        await queryRunner.query(`ALTER TABLE "cars_image" ALTER COLUMN "created_at" SET DEFAULT '2022-10-19 14:44:58.952532'`);
        await queryRunner.query(`ALTER TABLE "specifications" ALTER COLUMN "created_at" SET DEFAULT '2022-10-19 14:44:58.952532'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "created_at" SET DEFAULT '2022-10-19 14:44:58.952532'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT '2022-10-19 14:44:58.952532'`);
        await queryRunner.query(`DROP TABLE "users_tokens"`);
    }

}
