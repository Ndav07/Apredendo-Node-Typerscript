import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
    async handle(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
        const rental = await devolutionRentalUseCase.execute(id);
        return res.status(201).json(rental);
    }
};

export { DevolutionRentalController };