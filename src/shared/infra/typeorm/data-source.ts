import { DataSource } from "typeorm";

export const PostgresConnectDataBase = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "nodetype",
    entities: ["./src/modules/**/infra/typeorm/entities/*.{ts,js}"],
    migrations: ["./src/shared/infra/typeorm/migrations/*.{ts,js}"]
});