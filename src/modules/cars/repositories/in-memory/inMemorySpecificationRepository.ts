import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class InMemorySpecificationRepository implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.find(specification => specification.name === name);
        return specification;
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();
        Object.assign(specification, { name, description });
        this.specifications.push(specification);
    }

    async list(): Promise<Specification[]> {
        const specifications = this.specifications;
        return specifications;
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specifications.filter((specifications) => ids.includes(specifications.id));
        return specifications;
    }

}

export { InMemorySpecificationRepository };