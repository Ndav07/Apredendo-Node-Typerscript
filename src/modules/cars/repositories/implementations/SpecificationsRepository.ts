import { Repository } from "typeorm";
import { PostgresConnectDataBase } from "../../../../database/data-source";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {
    public repository: Repository<Specification>;

    constructor(){
        const connectionDataBase = PostgresConnectDataBase;
        this.repository = connectionDataBase.getRepository(Specification);
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
        const specification = await this.repository.find({ 
            select: {
                id: true,
                name: true,
                description: true
            },
        });
        return specification;
    }
};

export { SpecificationsRepository };