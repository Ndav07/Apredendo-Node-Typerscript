import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { ICreateUserDTO, IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {};
    async execute({ name, email, password, drive_licence }: ICreateUserDTO): Promise<void> {
        const userAlreadyEmailExists = await this.usersRepository.findByEmail(email);

        if(userAlreadyEmailExists) {
            throw new AppError("Email already exists");
        }
        
        const passwordHash = await hash(password, 8);
        await this.usersRepository.create({ name, email, password: passwordHash, drive_licence });
    }
};

export { CreateUserUseCase };