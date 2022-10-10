import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
    car: string;
    specifications: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    constructor(@inject("CarsRepository") private carsRepository: ICarsRepository, @inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository) {};
    async execute({ car, specifications }): Promise<void> {
        const carExist = await this.carsRepository.findById(car);
        if(!carExist){
            throw new AppError("Car does not exists!");
        }
        const specificationsUser = await this.specificationsRepository.findByIds(specifications);

        if(!specificationsUser) {
            throw new AppError("Specifications does not exists!")
        }
        
        await this.carsRepository.addSpecificatiosInCar(carExist, specificationsUser);
    }
};

export { CreateCarSpecificationUseCase };