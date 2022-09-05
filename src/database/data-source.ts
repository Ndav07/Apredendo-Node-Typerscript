import { DataSource } from "typeorm";

export const PostgresConnectDataBase = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "nodetype",
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    //entities: ["./src/modules/cars/entities/*.{ts, js}"],
    //migrations: ["./src/database/migrations/*.{ts, js}"],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});