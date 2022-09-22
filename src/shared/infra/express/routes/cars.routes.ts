import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";


const carsRoutes = Router();

const listCarsController = new ListCarsController();
const createCarController = new CreateCarController();

carsRoutes.use(ensureAuthenticated);

carsRoutes.get("/", listCarsController.handle);

carsRoutes.post("/", ensureAdmin, createCarController.handle);

export { carsRoutes };