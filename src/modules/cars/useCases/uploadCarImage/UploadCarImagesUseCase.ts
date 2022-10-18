import { inject, injectable } from "tsyringe";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(@inject("CarsImagesRepository") private carsImagesRepository: ICarsImagesRepository, @inject("CarsRepository") private carsRepository: ICarsRepository) {}
    async execute({ car, images_name }: IRequest): Promise<void> {
        const usedCar = await this.carsRepository.findById(car);
        if(!usedCar) {
            throw new AppError('Car does not exist!');
        }

        for(let j in images_name){
            await this.carsImagesRepository.create({ car: usedCar, image_name: images_name[j] });
        }
    }
};

export { UploadCarImagesUseCase };