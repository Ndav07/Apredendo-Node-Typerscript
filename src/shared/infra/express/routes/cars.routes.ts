import { Router } from "express";

import multer from "multer";
import uploadConfig from "@config/upload";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImage/UploadCarImagesController";

const carsRoutes = Router();

const uploadImagesCars = multer(uploadConfig.upload("./tmp/cars"));

const listAvailableCarsController = new ListAvailableCarsController();
const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.post("/imagesCars/:id", ensureAuthenticated, ensureAdmin, uploadImagesCars.array("images"), uploadCarImagesController.handle);

carsRoutes.post("/createCarSpecifications", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

export { carsRoutes };