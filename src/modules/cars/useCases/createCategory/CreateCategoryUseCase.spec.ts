import { AppError } from "@shared/errors/AppError";
import { InMemoryCategoriesRepository } from "@modules/cars/repositories/in-memory/InMemoryCategoryRepository";
import { CreateCategoryUseCase } from "@modules/cars/useCases/createCategory/CreateCategoryUseCase";

describe("Create Category", () => {

    let createCategoryUseCase: CreateCategoryUseCase;
    let inMemoryCategoriesRepository: InMemoryCategoriesRepository;
    
    beforeEach(() => {
        inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
        createCategoryUseCase = new CreateCategoryUseCase(inMemoryCategoriesRepository); 
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category test",
            description: "Category description teste"
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreate = await inMemoryCategoriesRepository.findByName(category.name);

        expect(categoryCreate).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const category = {
                name: "Category test",
                description: "Category description teste"
            };
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})