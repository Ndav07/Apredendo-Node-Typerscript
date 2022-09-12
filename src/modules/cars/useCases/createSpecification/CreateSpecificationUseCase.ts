import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository, ICreateSpecification } from "../../repositories/ISpecificationsRepository";

@injectable()
class CreateSpecificationUseCase {
    constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository){}

    async execute({name, description}: ICreateSpecification){
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new AppError("Specification already exists!");
        };

        this.specificationsRepository.create({ name, description });
    }
};

export { CreateSpecificationUseCase };