import { Repository } from "typeorm";

import { PostgresConnectDataBase } from "@shared/infra/typeorm/data-source";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{
    public repository: Repository<Category>;
    constructor() {
        const connectionDataBase = PostgresConnectDataBase;
        this.repository = connectionDataBase.getRepository(Category);
    };

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ where: {name: name} });
        return category;
    }

    async create({ name, description }: ICreateCategoryDTO ): Promise<void> {
        const category = this.repository.create({ name, description });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find({ 
            select: {
                id: true,
                name: true,
                description: true
            },
        });
        return categories;
    }
};

export { CategoriesRepository };