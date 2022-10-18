import { IRentalsRepository, ICreateRentalDTO } from "@modules/rentals/repositories/IRentalsRepository";
import { PostgresConnectDataBase } from "@shared/infra/typeorm/data-source";
import { DataSource, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository{
    private connectionDataBase: DataSource; 
    private repository: Repository<Rental>;

    constructor() {
        this.connectionDataBase = PostgresConnectDataBase;
        this.repository = this.connectionDataBase.getRepository(Rental);
    }

    async findByCar(car: string): Promise<boolean> {
        const carAvailable = await this.repository.createQueryBuilder("car").where("rentals.car = :car", { car }).getOne();
        if(!carAvailable) {
            return true
        } else {
            return false
        }
    }

    create({ user, car, start_date, expected_return_date }: ICreateRentalDTO ): Promise<void> {
        throw new Error("Method not implemented.");
    }
};

export { RentalsRepository };