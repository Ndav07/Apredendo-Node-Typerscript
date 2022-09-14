import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
class CreateSpecificationUseCase {
    constructor(@inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository){}

    async execute({ name, description }: ICreateSpecificationDTO){
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new AppError("Specification already exists!");
        };

        this.specificationsRepository.create({ name, description });
    }
};

export { CreateSpecificationUseCase };