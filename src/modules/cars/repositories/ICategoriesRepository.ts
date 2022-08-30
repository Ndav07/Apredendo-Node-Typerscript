import { Category } from "../model/Category";

interface ICreateCategory {
    name: string;
    description: string;
};

interface ICategoriesRepository {
    create({ name, description }: ICreateCategory): void;
    findByName(name: string): Category;
    list(): Category[];
};

export { ICategoriesRepository, ICreateCategory };