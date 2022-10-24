import { Router } from "express";

import { authenticateRoutes } from "@shared/infra/express/routes/authenticate.routes";
import { categoriesRoutes } from "@shared/infra/express/routes/categories.routes";
import { specificationRoutes } from "@shared/infra/express/routes/specifications.routes";
import { usersRouter } from "@shared/infra/express/routes/users.routes";
import { carsRoutes } from "@shared/infra/express/routes/cars.routes";
import { rentalsRoutes } from "@shared/infra/express/routes/rentals.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRouter);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/password", passwordRoutes);

export { router };