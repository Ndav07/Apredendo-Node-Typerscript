import { Router } from "express";

import { authenticateRoutes } from "@shared/infra/express/routes/authenticate.routes";
import { categoriesRoutes } from "@shared/infra/express/routes/categories.routes";
import { specificationRoutes } from "@shared/infra/express/routes/specifications.routes";
import { usersRouter } from "@shared/infra/express/routes/users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRouter);

export { router };