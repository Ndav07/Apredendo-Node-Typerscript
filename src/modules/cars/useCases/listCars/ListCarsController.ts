import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCarsUseCase } from "./ListCarsUseCase";

class ListCarsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { category, brand, name } = req.body;
        const listCarsUseCase = container.resolve(ListCarsUseCase);
        const cars = await listCarsUseCase.execute({ category, brand, name });
        return res.status(200).json(cars);
    }
};

export { ListCarsController };