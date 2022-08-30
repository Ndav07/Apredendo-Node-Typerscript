import { Router } from "express";
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

const specificationRoutes = Router();
const specificationsRepository = new SpecificationRepository();

specificationRoutes.post("/", (req, res) => {
    const { name, description } = req.body;
    const createSpecificationsService = new CreateSpecificationService(specificationsRepository);
    createSpecificationsService.execute({ name, description });
    return res.status(201).send();
});

specificationRoutes.get("/", (req, res) => {
    const all = specificationsRepository.list();
    return res.json(all);
});

export { specificationRoutes };