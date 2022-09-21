import { Request, Response } from "express";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { container } from "tsyringe";

class CreateCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, description, daily_rate, license_plate, fine_amount, brand, category } = req.body;
        const createCarUseCase = container.resolve(CreateCarUseCase);
        const car = await createCarUseCase.execute({ name, description, daily_rate, license_plate, fine_amount, brand, category });
        return res.status(201).json(car);  
    }
};

export { CreateCarController };