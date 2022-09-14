import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@modules/accounts/useCase/createUseCase/CreateUserUseCase";

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response>{
        const { name, password, email, drive_licence } = req.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute({ name, password, email, drive_licence });
        return res.status(201).send();
    }
};

export { CreateUserController };