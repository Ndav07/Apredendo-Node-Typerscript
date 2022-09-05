import { Category } from "../entities/Category";

interface ICreateCategory {
    name: string;
    description: string;
};

interface ICategoriesRepository {
    create({ name, description }: ICreateCategory): Promise<void>;
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
};

export { ICategoriesRepository, ICreateCategory };