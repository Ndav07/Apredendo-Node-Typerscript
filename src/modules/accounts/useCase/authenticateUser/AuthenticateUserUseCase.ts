import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import auth from "@config/auth";

interface IRquest {
    email: string;
    password: string;
};

interface IResponse {
    token: string;
    user: {
        name: string,
        email: string
    };
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository, @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository, @inject("DayjsDateProvider") private dateProvider: IDateProvider) {}
    async execute({ email, password }: IRquest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError("Email or password incorrect!", 401);
        };

        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("Email or password incorrect!", 401);
        };

        const { secret_token, expires_in_token, secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;

        const token = sign({  }, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const refresh_token = sign({ email: user.email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);

        await this.usersTokensRepository.create({ refresh_token: refresh_token, user: user, expires_date: refresh_token_expires_date});

        const tokenReturn: IResponse = {
            token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email
            }
        };

        return tokenReturn;
    }
};

export { AuthenticateUserUseCase };