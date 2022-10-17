import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    category?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(@inject("CarsRepository") private carsRepository: ICarsRepository) {}
    async execute({ category, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(category, brand, name);
        return cars;
    }
};

export { ListAvailableCarsUseCase };