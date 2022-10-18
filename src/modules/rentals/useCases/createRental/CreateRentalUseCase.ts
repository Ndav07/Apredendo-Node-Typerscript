import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    user: string;
    car: string;
    start_date: Date;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(@inject("RentalsRepository") private rentalsRepository: IRentalsRepository, @inject("CarsRepository") private carsRepository: ICarsRepository, @inject("UsersRepository") private usersRepository: IUsersRepository) {}
    async execute({ user, car, start_date, expected_return_date }: IRequest): Promise<void> {
        const carAvailable = await this.rentalsRepository.findByCar(car);
        if(carAvailable === false) {
            throw new AppError("Car does not available");
        }
        const usedCar = await this.carsRepository.findById(car);
        if(!usedCar) {
            throw new AppError("");
        }

        const activeUser = await this.usersRepository.findById(user);
        if(!activeUser) {
            throw new AppError("");
        }

        await this.rentalsRepository.create({ user: activeUser, car: usedCar, start_date, expected_return_date })
    }
};

export { CreateRentalUseCase };