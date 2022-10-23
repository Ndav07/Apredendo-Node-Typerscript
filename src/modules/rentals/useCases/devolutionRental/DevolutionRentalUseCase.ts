import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@injectable()
class DevolutionRentalUseCase {
    constructor(@inject("RentalsRepository") private rentalsRepository: IRentalsRepository, @inject("CarsRepository") private carsRepository: ICarsRepository, @inject("DayjsDateProvider") private dateProvider: IDateProvider) {}
    async execute(id: string): Promise<Rental> {
        const mininumDaily = 1;

        const rental = await this.rentalsRepository.findRentalById(id);
        if(!rental) { 
            throw new AppError("Rental does not exists!");
        }
        
        const car = rental.car;

        const dateNow = this.dateProvider.dateNow();

        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

        if(daily <= 0) {
            daily = mininumDaily;
        }

        const diffInDays = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);

        let total = 0;

        if(diffInDays > 0) {
            const calculateFine = diffInDays * car.fine_amount;
            total = calculateFine;
        }


        total += daily * car.daily_rate;

        await this.rentalsRepository.updateRental({ id: id, end_date: dateNow, total: total, updated_at: dateNow });

        await this.carsRepository.editAvailability({ id: car.id, state: true });

        const returnRental = await this.rentalsRepository.findRentalById(id);

        return returnRental;
    } 
};

export { DevolutionRentalUseCase };