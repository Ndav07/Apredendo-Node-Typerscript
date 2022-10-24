import { User } from "../infra/typeorm/entities/User";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface ICreateUserToken {
    refresh_token: string;
    user: User;
    expires_date: Date; 
};

interface IUsersTokensRepository {
    create(data: ICreateUserToken): Promise<UserToken>;
    findByUserIdAndRefreshToken(user: string, refresh_token: string): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
};

export { IUsersTokensRepository, ICreateUserToken };