import { Car } from "@modules/cars/infra/typeorm/entities/Car";

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
};

export { ICarsRepository, ICreateCarDTO };