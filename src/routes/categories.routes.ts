import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportyCategoryController } from "../modules/cars/useCases/importCategory/ImportyCategoryController";

const categoriesRoutes = Router();

const upload = multer({ 
    dest: "./tmp",
})

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importyCategoryController = new ImportyCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", upload.single("file"), importyCategoryController.handle);

export { categoriesRoutes };