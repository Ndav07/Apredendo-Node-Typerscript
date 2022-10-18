import { Request, Response } from "express";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { container } from "tsyringe";

class CreateRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {  } = req.body;
        const createCarUseCase = container.resolve(CreateRentalUseCase);
        const car = await createCarUseCase.execute({  });
        return res.status(201).send();  
    }
};

export { CreateRentalController };