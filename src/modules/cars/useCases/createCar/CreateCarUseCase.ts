import { inject, injectable } from "tsyringe";

@injectable()
class CreateCarUseCase {
    constructor(@inject() private carRepository: ) {}
    async execute(): Promise<void> {
        
    }
};

export { CreateCarUseCase };