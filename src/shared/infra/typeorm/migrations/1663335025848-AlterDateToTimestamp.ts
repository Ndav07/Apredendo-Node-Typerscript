import { TableColumn, MigrationInterface, QueryRunner } from "typeorm"

export class AlterDateToTimestamp1663335025848 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("users", "created_at", 
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "now()"
            })
        );
        await queryRunner.changeColumn("categories", "created_at", 
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "now()"
            })
        );
        await queryRunner.changeColumn("specifications", "created_at", 
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "now()"
            })
        );
        await queryRunner.changeColumn("cars", "created_at", 
            new TableColumn({
                name: "created_at",
                type: "timestamp",
                default: "now()"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("users", "created_at", 
            new TableColumn({
                name: "created_at",
                type: "Date"
            })
        );
        await queryRunner.changeColumn("categories", "created_at", 
            new TableColumn({
                name: "created_at",
                type: "Date"
            })
        );
        await queryRunner.changeColumn("specifications", "created_at", 
            new TableColumn({
                name: "created_at",
                type: "Date"
            })
        );
        await queryRunner.changeColumn("cars", "created_at", 
            new TableColumn({
                name: "created_at",
                type: "Date"
            })
        );
    }

}
