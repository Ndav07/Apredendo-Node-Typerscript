import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { car, specifications } = req.body;
        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);
        await createCarSpecificationUseCase.execute({ car, specifications });
        return res.status(201).send();
    }
};

export { CreateCarSpecificationController }