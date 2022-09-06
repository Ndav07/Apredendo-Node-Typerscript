import { Repository } from "typeorm";
import { PostgresConnectDataBase } from "../../../../database/data-source";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategory } from "../ICategoriesRepository";


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

    async create({ name, description }: ICreateCategory ): Promise<void> {
        const category = this.repository.create({ name, description });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find({ 
            select: {
                id: false,
                name: true,
                description: true
            },
        });
        return categories;
    }

};

export { CategoriesRepository };