import { DataSource, Repository } from "typeorm";

import { PostgresConnectDataBase } from "@shared/infra/typeorm/data-source";
import { Car } from "../entities/Car";
import { ICarsRepository, ICreateCarDTO, IEditCarAvailabilityDTO } from "@modules/cars/repositories/ICarsRepository";
import { Category } from "../entities/Category";
import { AppError } from "@shared/errors/AppError";
import { Specification } from "../entities/Specification";


class CarsRepository implements ICarsRepository {
    private connectionDataBase: DataSource; 
    private repository: Repository<Car>;

    constructor() {
        this.connectionDataBase = PostgresConnectDataBase;
        this.repository = this.connectionDataBase.getRepository(Car);
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { id: id }});
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ where: {license_plate: license_plate} });
        return car;
    }

    async findAvailable(category?: string, brand?: string, name?: string): Promise<Car[]> {
        const carsQuery = this.repository.createQueryBuilder("cars").leftJoinAndSelect("cars.category", "category").leftJoinAndSelect("cars.specifications", "specifications").where("cars.available = :available", { available : true});
        if(category) {
            carsQuery.andWhere("cars.category.id = :category", { category });
        }
        if(brand) {
            carsQuery.andWhere("cars.brand = :brand", { brand });
        }
        if(name) {
            carsQuery.andWhere("cars.name = :name", { name });
        }
            
        const cars = await carsQuery.getMany();
            
        return cars;
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
    
    async addSpecificatiosInCar(car: Car, specifications: Specification): Promise<void> {
        await this.connectionDataBase.createQueryBuilder().insert().into("cars_specifications_specifications").values({
            carsId : car.id,
            specificationsId: specifications.id
        }).execute();
    }

    async editAvailability({ id, state }: IEditCarAvailabilityDTO): Promise<void> {
        await this.repository.createQueryBuilder().update().set({ available: state }).where("id = :id", { id }).execute();
    }
};

export { CarsRepository }