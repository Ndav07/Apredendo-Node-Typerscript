import { Specification } from "../../model/Specification";
import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";


class ListSpecificationsUseCase {
    constructor(private specificationRepository: SpecificationRepository) {}
    execute(): Specification[] {
        const specifications = this.specificationRepository.list();
        return specifications;
    }
};

export { ListSpecificationsUseCase };