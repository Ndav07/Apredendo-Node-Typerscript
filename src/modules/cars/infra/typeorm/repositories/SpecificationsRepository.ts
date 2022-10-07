import { Repository, DataSource } from "typeorm";

import { PostgresConnectDataBase } from "@shared/infra/typeorm/data-source";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private connectionDataBase: DataSource; 
    private repository: Repository<Specification>;

    constructor() {
        this.connectionDataBase = PostgresConnectDataBase;
        this.repository = this.connectionDataBase.getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ where: {name: name} });
        return specification;
    }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({ name, description });
        await this.repository.save(specification);
    }

    async list(): Promise<Specification[]> {
        const specification = await this.repository.createQueryBuilder("specifications").getMany();
        return specification;
    }
};

export { SpecificationsRepository };