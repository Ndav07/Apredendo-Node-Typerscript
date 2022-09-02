import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../entities/cars/useCases/createCategory";
import { listCategoriesController } from "../entities/cars/useCases/listCaregories";
import { importyCategoryController } from "../entities/cars/useCases/importCategory";

const categoriesRoutes = Router();

const upload = multer({ 
    dest: "./tmp",
})

categoriesRoutes.post("/", (req, res) => {
    return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
    return listCategoriesController.handle(req, res);
})

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
    return importyCategoryController.handle(req, res);
});

export { categoriesRoutes };