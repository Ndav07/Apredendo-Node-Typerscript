import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    token: string;
    password: string;
};

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider") private dateProvider: IDateProvider,
        @inject("UsersRepository") private usersRepository: IUsersRepository) {}
    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);
        if(!userToken) {
            throw new AppError("Token Invalid");
        }
        
        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError("Token expired!")
        }

        const user = await this.usersRepository.findById(userToken.user.id);

        const newPassword = await hash(password, 8);

        await this.usersRepository.updatePassword(newPassword, user.id);

        await this.usersTokensRepository.deleteById(userToken.id);
    }
};

export { ResetPasswordUserUseCase };