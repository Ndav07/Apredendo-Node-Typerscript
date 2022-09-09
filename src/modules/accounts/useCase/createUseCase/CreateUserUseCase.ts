import { inject, injectable } from "tsyringe";
import { ICreateUserDTO, IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";

@injectable()
class CreateUserUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {};
    async execute({ name, email, passaword, drive_licence }: ICreateUserDTO): Promise<void> {
        const userAlreadyEmailExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyEmailExists) {
            throw new Error("Email already exists");
        }
        
        const passawordHash = await hash(passaword, 8);
        await this.usersRepository.create({ name, email, passaword: passawordHash, drive_licence });
    }
};

export { CreateUserUseCase };