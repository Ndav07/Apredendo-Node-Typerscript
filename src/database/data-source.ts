import { DataSource } from "typeorm";

export const PostgresConnectDataBase = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "nodetype",
    entities: ["./src/modules/**/entities/*.{ts,js}"],
    migrations: ["./src/database/migrations/*.{ts,js}"]
});