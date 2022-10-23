import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Rental } from "../infra/typeorm/entities/Rental";

interface ICreateRentalDTO {
    user: User;
    car: Car;
    expected_return_date: Date;
};

interface IEditRentalDTO {
    id: string;
    end_date: Date;
    total: number;
    updated_at: Date;
}

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    findOpenRentalByUser(user: string): Promise<boolean>;
    findRentalsByUser(user: string): Promise<Rental[]>;
    findRentalById(id: string): Promise<Rental>;
    updateRental(data: IEditRentalDTO): Promise<void>;
};

export { IRentalsRepository, ICreateRentalDTO, IEditRentalDTO };