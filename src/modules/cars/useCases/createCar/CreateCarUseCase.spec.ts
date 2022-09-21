import { AppError } from "@shared/errors/AppError";
import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/inMemoryCarsRepository";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";

let createCarUseCase: CreateCarUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;
let car: ICreateCarDTO;

describe("Create Car", () => {
    beforeEach(() => {
        inMemoryCarsRepository = new InMemoryCarsRepository();
        createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
        car = {
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category: "category"
        };
    });
    
    it("should be able to create a new car", async () => {
        const carCreate = await createCarUseCase.execute(car);
         
        expect(carCreate).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license place", () => {
        expect(async () => {
            await createCarUseCase.execute(car);
            await createCarUseCase.execute({
                name: "Name Car2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category: "category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a car with available true by default", async () => {
        const carCreate = await createCarUseCase.execute(car);

        expect(carCreate.available).toBe(true);
    });
})