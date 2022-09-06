import { Specification } from "../entities/Specification";

interface ICreateSpecification {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification>;
    create({ name, description }: ICreateSpecification): Promise<void>;
    list(): Promise<Specification[]>;
}

export { ICreateSpecification, ISpecificationsRepository}