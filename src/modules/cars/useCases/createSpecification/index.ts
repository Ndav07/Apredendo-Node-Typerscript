import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

const specificationReposity = null;
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationReposity);
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export { createSpecificationController };