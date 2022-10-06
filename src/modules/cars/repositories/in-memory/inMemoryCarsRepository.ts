import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

class InMemoryCarsRepository implements ICarsRepository {
    cars: Car[] = [];

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = this.cars.find(car => car.license_plate === license_plate);
        return car;
    }

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category }: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, { name, description, daily_rate, license_plate, fine_amount, brand, category });
        this.cars.push(car);
        return car;
    }

    async findAvailable(category?: string, brand?: string, name?: string): Promise<Car[]> {
        const cars = this.cars.filter((cars) => {
            if (cars.available === true && ((brand && cars.brand === brand) || (category && cars.category.id === category) || (name && cars.name === name))) {
                return cars;
            }
        });
        return cars;
    }
};

export { InMemoryCarsRepository };