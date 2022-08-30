import { ICategoriesRepository, IcreateCategoryDTO } from "./ICategoriesRepository";
import { Category } from "../model/Category";

class PostgresCategoriesRepository implements ICategoriesRepository{
    findByName(name: string): Category{
        return null;
    };
    list(): Category[] {
        return null;
    };
    create({ name, description } : IcreateCategoryDTO): void {
        console.log(description);
    };
};

export { PostgresCategoriesRepository };