import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Rental } from "../infra/typeorm/entities/Rental";

interface ICreateRentalDTO {
    user: User;
    car: Car;
    expected_return_date: Date;
};

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    findOpenRentalByUser(user: string): Promise<boolean>;
};

export { IRentalsRepository, ICreateRentalDTO };