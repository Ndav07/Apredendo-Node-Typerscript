import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterUsersCollumPassaword1663155204983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "passaword", "password")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "password", "passaword")
    }

}
