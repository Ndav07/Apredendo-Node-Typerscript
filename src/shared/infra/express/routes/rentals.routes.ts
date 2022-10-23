import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalsRoutes = Router();

const createRentalcontroller = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.use(ensureAuthenticated);

rentalsRoutes.post("/", createRentalcontroller.handle);
rentalsRoutes.put("/devolution/:id", devolutionRentalController.handle);
rentalsRoutes.get("/user", listRentalsByUserController.handle);

export { rentalsRoutes };