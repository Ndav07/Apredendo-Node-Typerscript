import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface ICreateRentalDTO {
    user: User;
    car: Car;
    start_date: Date;
    expected_return_date: Date;
};

interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<void>;
    findByCar(car: string): Promise<boolean>;
};

export { IRentalsRepository, ICreateRentalDTO };