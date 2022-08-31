import { ImportyCategoryController } from "./ImportyCategoryController";
import { ImportyCategoryUseCase } from "./ImportyCategoryUseCase";

const importyCategoryUseCase = new ImportyCategoryUseCase();
const importyCategoryController = new ImportyCategoryController(importyCategoryUseCase);

export { importyCategoryController };