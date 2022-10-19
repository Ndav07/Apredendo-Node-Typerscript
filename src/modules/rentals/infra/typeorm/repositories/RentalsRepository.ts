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

    async findOpenRentalByUser(user: string): Promise<boolean> {
        const openRental = await this.repository.createQueryBuilder("rentals").where("rentals.user = :user", { user }).getOne();
        if(openRental && !openRental.end_date) {
            return true
        } else {
            return false
        }
    }

    async create({ user, car, expected_return_date }: ICreateRentalDTO ): Promise<Rental> {
        const rental = this.repository.create({ user, car, expected_return_date });
        await this.repository.save(rental);
        return rental;
    }
};

export { RentalsRepository };