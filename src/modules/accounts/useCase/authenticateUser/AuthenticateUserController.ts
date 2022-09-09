import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { container } from "tsyringe";

class AuthenticateUserController {
    async hadle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
        const token = await authenticateUserUseCase.execute({ email, password });
        return res.status(200).send(token);
    }
};

export { AuthenticateUserController };