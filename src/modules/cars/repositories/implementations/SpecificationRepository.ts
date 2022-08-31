import { Specification } from "../../model/Specification";
import { ICreateSpecification, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    private static INSTANCE: SpecificationRepository;

    private constructor(){
        this.specifications = [];
    }

    public static getInstance(): SpecificationRepository {
        if(!SpecificationRepository.INSTANCE) {
            SpecificationRepository.INSTANCE = new SpecificationRepository();
        }
        
        return SpecificationRepository.INSTANCE;
    }

    findByName(name: string): Specification{
        const specification = this.specifications.find(spefication => spefication.name === name);
        return specification;
    }
    
    create({ name, description }: ICreateSpecification): void {
        const specification = new Specification();

        Object.assign(specification, {
            name, 
            description, 
            created_at: new Date()
        })

        this.specifications.push(specification); 
    }

    list(): Specification[] {
        return this.specifications;
    }
};

export { SpecificationRepository };