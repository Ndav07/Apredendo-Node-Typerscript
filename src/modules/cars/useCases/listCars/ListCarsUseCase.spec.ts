import { ListCarsUseCase } from "./ListCarsUseCase";
import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/inMemoryCarsRepository";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

describe("List Cars", () => {
    let inMemoryCarsRepository: InMemoryCarsRepository;
    let listCarsUseCase: ListCarsUseCase;
    let carsUsers: any;

    beforeEach(() => {
        inMemoryCarsRepository = new InMemoryCarsRepository();
        listCarsUseCase = new ListCarsUseCase(inMemoryCarsRepository);
        carsUsers = [
            {
                name: "Name Car1",
                description: "Description Car1",
                daily_rate: 1,
                license_plate: "ABC-1111",
                fine_amount: 1,
                brand: "Test1",
                category: {
                    id: "test1",
                    name: "test1",
                    description: "Description Category1",
                    created_at: new Date()
                }
            },
            {
                name: "Name Car2",
                description: "Description Car2",
                daily_rate: 2,
                license_plate: "ABC-2222",
                fine_amount: 2,
                brand: "Test2",
                category: {
                    id: "test2",
                    name: "test2",
                    description: "Description Category2",
                    created_at: new Date()
                }
            },
        ];
    });

    it("should be able to list all available cars", async () => {
        inMemoryCarsRepository.create(carsUsers);
        const cars = await listCarsUseCase.execute({ brand: "Test2" });
        expect(cars).toBe([carsUsers]);
    });

    it("should be able to list all available cars by name", () => {

    });
})