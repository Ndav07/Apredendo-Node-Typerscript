import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository, ICreateSpecification } from "../../repositories/ISpecificationsRepository";

@injectable()
class CreateSpecificationUseCase {
    constructor(@inject("SpecificationRepository") private specificationsRepository: ISpecificationsRepository){}

    execute({name, description}: ICreateSpecification){
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);

        if(specificationAlreadyExists){
            throw new Error("Specification already exists!");
        };

        this.specificationsRepository.create({ name, description });
    }
};

export { CreateSpecificationUseCase };