import { AppError } from "@shared/errors/AppError";
import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/inMemoryCarsRepository";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { InMemorySpecificationRepository } from "@modules/cars/repositories/in-memory/inMemorySpecificationRepository";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;
let inMemorySpecificationRepository: InMemorySpecificationRepository; 

describe("Create Specification in Car", () => {
    beforeEach(() => {
        inMemoryCarsRepository = new InMemoryCarsRepository();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(inMemoryCarsRepository, inMemorySpecificationRepository);
        
    });

    it("should not be able to add a new specification to a now-existent car", async () => {
        expect(async () => {
            const car = "Carro 2";
            const specifications = ["7587", "1234", "89898"];
            await createCarSpecificationUseCase.execute({car, specifications});
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const createCar = await inMemoryCarsRepository.create({
            name: "Name Car2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category: "category"
        });
        const specifications = ["7587", "1234", "89898"];
        await createCarSpecificationUseCase.execute({car : createCar.id, specifications});
    });

});