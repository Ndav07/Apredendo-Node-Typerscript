import { IRentalsRepository, ICreateRentalDTO, IEditRentalDTO } from "@modules/rentals/repositories/IRentalsRepository";
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

    async findRentalsByUser(user: string): Promise<Rental[]> {
        const rentals = await this.repository.createQueryBuilder("rentals").where("rentals.user = :user", { user }).getMany();
        return rentals;
    }

    async create({ user, car, expected_return_date }: ICreateRentalDTO ): Promise<Rental> {
        const rental = this.repository.create({ user, car, expected_return_date });
        await this.repository.save(rental);
        return rental;
    }

    async findRentalById(id: string): Promise<Rental> {
        const rental = this.repository.createQueryBuilder("rental").where("rental.id = :id", { id }).getOne();
        return rental;
    }

    async updateRental({ id, end_date, total, updated_at }: IEditRentalDTO): Promise<void> {
        await this.repository.createQueryBuilder().update().set({ end_date: end_date, total: total, updated_at: updated_at }).where("id = :id", { id }).execute();
    }
};

export { RentalsRepository };