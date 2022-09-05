import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";

const specificationRoutes = Router();

specificationRoutes.post("/", (req, res) => {
    return createSpecificationController.handle(req, res);
});

specificationRoutes.get("/", (req, res) => {
    return listSpecificationsController.handle(req, res);
});

export { specificationRoutes };