import express, { Request, Response, NextFunction }  from "express";
import "express-async-errors";

import swaggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";

import { PostgresConnectDataBase } from "@database/data-source";

import "./shared/container/containers";

import { router } from "./routes/routers";
import { AppError } from "@errors/AppError";

PostgresConnectDataBase.initialize().then(() => {
        console.log("Data Source has been initialized!");
        const app = express();
        app.use(express.json());
        app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));
        app.use(router);

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if(err instanceof AppError) {
                return res.status(err.statusCode).json({
                    message: err.message
                })
            }

            return res.status(500).json({
                status: "error",
                message: `Internal serve error - ${err.message}`
            })
        });
        
        app.listen(3333, () => console.log(`API start in ... ${'http://localhost:3333/'}`));
    }).catch((err) => {
        console.error("Error during Data Source initialization", err);
    }
);