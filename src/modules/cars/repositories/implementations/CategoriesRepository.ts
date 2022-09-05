import { Repository } from "typeorm";
import { PostgresConnectDataBase } from "../../../../database/data-source";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategory } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository{
    private repository: Repository<Category>;

    constructor() {
        this.repository = PostgresConnectDataBase.getRepository(Category);
    };

    async findByName(name: string): Promise<Category> {
        const category = await this.repository.findOne({ where: {name: name} });
        return category;
    }

    async create({ name, description }: ICreateCategory ): Promise<void> {
        const category = this.repository.create({ name, description });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

};

export { CategoriesRepository };