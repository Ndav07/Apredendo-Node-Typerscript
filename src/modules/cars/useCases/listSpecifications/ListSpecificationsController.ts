import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { container } from "tsyringe";
import { Request, Response } from "express";

class ListSpecificationsController {

    handle(req: Request, res: Response): Response {
        const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase)
        const listSpecifications = listSpecificationsUseCase.execute();
        return res.json(listSpecifications); 
    }
    
};

export { ListSpecificationsController };