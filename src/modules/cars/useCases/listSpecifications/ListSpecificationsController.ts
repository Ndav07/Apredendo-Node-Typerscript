import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { Request, Response } from "express";

class ListSpecificationsController {
    constructor(private listSpecificationUseCase: ListSpecificationsUseCase) {}

    handle(req: Request, res: Response): Response {
        const all = this.listSpecificationUseCase.execute();
        return res.json(all); 
    }
    
};

export { ListSpecificationsController };