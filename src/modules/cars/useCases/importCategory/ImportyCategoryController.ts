import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportyCategoryUseCase } from "./ImportyCategoryUseCase";

class ImportyCategoryController {
    handle(req: Request, res: Response): Response {
        const { file } = req;

        const importyCategoryUseCase = container.resolve(ImportyCategoryUseCase);

        importyCategoryUseCase.execute(file);

        return res.send();
    }
};

export { ImportyCategoryController };