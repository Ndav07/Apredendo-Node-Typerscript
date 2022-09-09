import express  from "express";

import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";

import { PostgresConnectDataBase } from "./database/data-source";

import "./shared/container/containers";

import { router } from "./routes/routers";

PostgresConnectDataBase.initialize().then(() => {
        console.log("Data Source has been initialized!");
        const app = express();
        app.use(express.json());
        app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
        app.use(router);
        app.listen(3333, () => console.log(`API start in ... ${'http://localhost:3333/'}`));
    }).catch((err) => {
        console.error("Error during Data Source initialization", err);
    }
);