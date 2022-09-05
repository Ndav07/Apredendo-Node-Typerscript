import { Request, Response } from "express";
import { ImportyCategoryUseCase } from "./ImportyCategoryUseCase";

class ImportyCategoryController {
    constructor(private importCategoryUseCase: ImportyCategoryUseCase) {}
     
    handle(req: Request, res: Response): Response {
        const { file } = req;

        this.importCategoryUseCase.execute(file);

        return res.send();
    }
};

export { ImportyCategoryController };