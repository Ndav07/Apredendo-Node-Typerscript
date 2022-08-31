import { ImportyCategoryController } from "./ImportyCategoryController";
import { ImportyCategoryUseCase } from "./ImportyCategoryUseCase";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

const categoriesRepository = CategoriesRepository.getInstance();
const importyCategoryUseCase = new ImportyCategoryUseCase(categoriesRepository);
const importyCategoryController = new ImportyCategoryController(importyCategoryUseCase);

export { importyCategoryController };