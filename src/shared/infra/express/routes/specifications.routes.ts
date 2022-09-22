import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/express/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationRoutes.use(ensureAuthenticated);

specificationRoutes.get("/", listSpecificationsController.handle);

specificationRoutes.post("/", ensureAdmin, createSpecificationController.handle);

export { specificationRoutes };