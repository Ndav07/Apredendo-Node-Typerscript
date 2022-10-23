import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    user: string;
    car: string;
    expected_return_date: Date;
}

interface IReturnRental {
    id: string;
    car_id: string;
    user_id: string;
    expected_return_date: Date;
    start_date: Date;
    created_at: Date;
    updated_at: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(@inject("RentalsRepository") private rentalsRepository: IRentalsRepository, @inject("CarsRepository") private carsRepository: ICarsRepository, @inject("UsersRepository") private usersRepository: IUsersRepository, @inject("DayjsDateProvider") private dateProvider: IDateProvider) {}
    async execute({ user, car, expected_return_date }: IRequest): Promise<IReturnRental> {
        const minimunHour = 24;

        const carExist = await this.carsRepository.findById(car);
        if(!carExist ) {
            throw new AppError("Car does not exist");
        }

        if(carExist.available === false) {
            throw new AppError("Car does not available");
        }

        const activeUser = await this.usersRepository.findById(user);
        if(!activeUser) {
            throw new AppError("User does not exist");
        }

        const rentalOpentToUser = await this.rentalsRepository.findOpenRentalByUser(activeUser.id);
        if(rentalOpentToUser === true) {
            throw new AppError("There's a rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date);

        if(compare < minimunHour) {
            throw new AppError("Invalid return time!");
        }

        const rental = await this.rentalsRepository.create({ user: activeUser, car: carExist, expected_return_date })
        
        await this.carsRepository.editAvailability({ id: carExist.id, state: false });

        const returnRent = {
            id: rental.id,
            car_id: rental.car.id,
            user_id: rental.user.id,
            expected_return_date: rental.expected_return_date,
            start_date: rental.start_date,
            created_at: rental.created_at,
            updated_at: rental.updated_at
        }
        
        return returnRent;
    }
};

export { CreateRentalUseCase };