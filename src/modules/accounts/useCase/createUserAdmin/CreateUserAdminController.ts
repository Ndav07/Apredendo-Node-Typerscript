import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserAdminUseCase } from "@modules/accounts/useCase/createUserAdmin/CreateUserAdminUseCase";

class CreateUserAdminController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { name, password, email, drive_license, isAdmin } = req.body;
        const createUserUseCase = container.resolve(CreateUserAdminUseCase);
        await createUserUseCase.execute({ name, password, email, drive_license, isAdmin });
        return res.status(201).send();
    }
};

export { CreateUserAdminController };