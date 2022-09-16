import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterUsersCollumDriveLincence1663329235619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "drive_licence", "drive_license")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn("users", "drive_license", "drive_licence")
    }

}
