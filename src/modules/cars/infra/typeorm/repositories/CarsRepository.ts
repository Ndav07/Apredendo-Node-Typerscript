import { DataSource, Repository } from "typeorm";

import { PostgresConnectDataBase } from "@shared/infra/typeorm/data-source";
import { Car } from "../entities/Car";
import { ICarsRepository, ICreateCarDTO } from "@modules/cars/repositories/ICarsRepository";
import { Category } from "../entities/Category";
import { AppError } from "@shared/errors/AppError";


class CarsRepository implements ICarsRepository {
    private connectionDataBase: DataSource; 
    private repository: Repository<Car>;

    constructor() {
        this.connectionDataBase = PostgresConnectDataBase;
        this.repository = this.connectionDataBase.getRepository(Car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ where: {license_plate: license_plate} });
        return car;
    }

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category }: ICreateCarDTO): Promise<Car> {
        const categotyCar = await this.connectionDataBase.getRepository(Category).findOne({ where: {id: category} });
        if(!categotyCar){
            throw new AppError("Category not exist", 400);
        };
        
        const car = this.repository.create({ name, description, daily_rate, license_plate, fine_amount, brand, category: categotyCar });
        await this.repository.save(car);
        return car;
    }

    async findAvailable(category?: string, brand?: string, name?: string): Promise<Car[]> {
        const cars = await this.repository.createQueryBuilder("cars").leftJoinAndSelect("cars.category", "category").where("cars.available = :available", { available : true}).getMany();
        return cars;
    }
};

export { CarsRepository }