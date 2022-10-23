import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(@inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository, @inject("UsersRepository") private usersRepository: IUsersRepository, @inject("DayjsDateProvider") private dateProvider: IDateProvider) {}
    async execute(token: string): Promise<string> {
        const { secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days } = auth;
        const { email, sub } = verify(token, secret_refresh_token) as IPayload;
        const user = sub;
        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user, token);

        if(!userToken) {
            throw new AppError("Refresh Token does not exists!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        
        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: sub,
            expiresIn: expires_in_refresh_token
        });
        
        const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);
        
        const userActive = await this.usersRepository.findByEmail(email);

        await this.usersTokensRepository.create({ expires_date: refresh_token_expires_date, user: userActive, refresh_token: refresh_token  })

        return refresh_token;
    }
};

export { RefreshTokenUseCase };