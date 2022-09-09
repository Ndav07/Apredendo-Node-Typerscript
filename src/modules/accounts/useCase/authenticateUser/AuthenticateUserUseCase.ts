import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

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
}

@injectable()
class AuthenticateUserUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}
    async execute({ email, password }: IRquest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new Error("Email or password incorrect!");
        };

        const passawordMatch = await compare(password, user.passaword);
        if(!passawordMatch){
            throw new Error("Email or password incorrect!");
        };

        const token = sign({  }, "13574ef0d58b50fab38ec841efe39df4", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;
    }
};

export { AuthenticateUserUseCase };