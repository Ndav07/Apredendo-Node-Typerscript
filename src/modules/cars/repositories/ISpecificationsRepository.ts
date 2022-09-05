import { Specification } from "../entities/Specification";

interface ICreateSpecification {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName(name: string): Specification;
    create({ name, description }: ICreateSpecification): void;
    list(): Specification[];
}

export { ICreateSpecification, ISpecificationsRepository}