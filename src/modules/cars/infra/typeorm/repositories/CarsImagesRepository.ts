import { DataSource, Repository } from "typeorm";

import { PostgresConnectDataBase } from "@shared/infra/typeorm/data-source";
import { ICarsImagesRepository, ICreateCarImagesDTO } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarImage } from "../entities/CarImage";

class CarsImagesRepository implements ICarsImagesRepository {
    private connectionDataBase: DataSource; 
    private repository: Repository<CarImage>;

    constructor() {
        this.connectionDataBase = PostgresConnectDataBase;
        this.repository = this.connectionDataBase.getRepository(CarImage);
    }
    
    async create({ car, image_name }: ICreateCarImagesDTO): Promise<void> {
        const carImage = this.repository.create({ car, image_name });
        await this.repository.save(carImage);
    }
};

export { CarsImagesRepository };