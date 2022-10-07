import { AppError } from "@shared/errors/AppError";
import { InMemorySpecificationRepository } from "@modules/cars/repositories/in-memory/inMemorySpecificationRepository";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

describe("Create Specification", () => {
    
    let inMemorySpecificationRepository: InMemorySpecificationRepository;
    let createSpecificationUseCase: CreateSpecificationUseCase;

    beforeEach(() => {
        inMemorySpecificationRepository = new InMemorySpecificationRepository();
        createSpecificationUseCase = new CreateSpecificationUseCase(inMemorySpecificationRepository);
    });

    it("teste", async () => {

    })

});