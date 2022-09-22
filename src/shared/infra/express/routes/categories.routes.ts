import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportyCategoryController } from "@modules/cars/useCases/importCategory/ImportyCategoryController";


const categoriesRoutes = Router();

const upload = multer({ 
    dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importyCategoryController = new ImportyCategoryController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/", ensureAdmin, createCategoryController.handle);
categoriesRoutes.post("/import", ensureAdmin, upload.single("file"), importyCategoryController.handle);

export { categoriesRoutes };