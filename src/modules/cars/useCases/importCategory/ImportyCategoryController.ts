import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportyCategoryUseCase } from "./ImportyCategoryUseCase";

class ImportyCategoryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { file } = req;
        const importyCategoryUseCase = container.resolve(ImportyCategoryUseCase);
        await importyCategoryUseCase.execute(file);
        return res.status(201).send();
    }
};

export { ImportyCategoryController };