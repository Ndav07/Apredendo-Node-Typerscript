import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category: string;
};

interface ICarsRepository {
    create(data : ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvailable(category?: string, brand?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    addSpecificatiosInCar(car: Car, specifications: Specification): Promise<void>;
};

export { ICarsRepository, ICreateCarDTO };