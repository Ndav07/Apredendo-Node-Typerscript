import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

class ListRentalsByUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const user = req.user.id;
        const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase);
        const rentals = await listRentalsByUserUseCase.execute(user);
        return res.status(200).json(rentals);
    };
};

export { ListRentalsByUserController };