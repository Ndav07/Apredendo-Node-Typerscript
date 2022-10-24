import { inject, injectable } from "tsyringe";
import { v4 as uiidv4 } from "uuid";
import { resolve } from "path";

import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

import auth from "@config/auth";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository, 
        @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository, 
        @inject("DayjsDateProvider") private dateProvider: IDateProvider,
        @inject("EtherealMailProvider") private mailProvider: IMailProvider) {}
    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);
        if(!user) {
            throw new AppError("User does not exists!");
        }

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");

        const token = uiidv4();

        const expires_date = this.dateProvider.addHours(auth.expires_refresh_token_hours);

        await this.usersTokensRepository.create({ refresh_token: token, user: user, expires_date });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        };

        await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath);
    }
};

export { SendForgotPasswordMailUseCase };