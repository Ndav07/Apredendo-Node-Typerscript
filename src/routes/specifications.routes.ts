import { Router } from "express";

import { createSpecificationController } from "../entities/cars/useCases/createSpecification";
import { listSpecificationsController } from "../entities/cars/useCases/listSpecifications";

const specificationRoutes = Router();

specificationRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res);
});

specificationRoutes.get("/", (req, res) => {
    return listSpecificationsController.handle(req, res);
});

export { specificationRoutes };