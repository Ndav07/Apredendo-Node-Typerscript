import { ImportyCategoryController } from "./ImportyCategoryController";
import { ImportyCategoryUseCase } from "./ImportyCategoryUseCase";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

export default(): ImportyCategoryController => {
    const categoriesRepository = new CategoriesRepository;
    const importyCategoryUseCase = new ImportyCategoryUseCase(categoriesRepository);
    const importyCategoryController = new ImportyCategoryController(importyCategoryUseCase);    
    return importyCategoryController;
}