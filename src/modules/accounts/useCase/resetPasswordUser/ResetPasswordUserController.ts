import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController { 
    async handle(req: Request, res: Response): Promise<Response> {
        
        const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase);
        await resetPasswordUserUseCase.execute();
        return res.status(200).send();
    }
};

export { ResetPasswordUserController };