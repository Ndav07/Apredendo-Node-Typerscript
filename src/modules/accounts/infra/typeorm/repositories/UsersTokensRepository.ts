import { DataSource, Repository } from "typeorm";

import { PostgresConnectDataBase } from "@shared/infra/typeorm/data-source";

import { IUsersTokensRepository, ICreateUserToken } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository {
    private connectionDataBase: DataSource;
    private repository : Repository<UserToken>;

    constructor() {
        this.connectionDataBase = PostgresConnectDataBase;
        this.repository = this.connectionDataBase.getRepository(UserToken);
    }
    
    async create({ refresh_token, user, expires_date }: ICreateUserToken): Promise<UserToken> {
        const createUser = this.repository.create({ refresh_token, user, expires_date });
        await this.repository.save(createUser);
        return createUser;
    }

    async findByUserIdAndRefreshToken(user: string, refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.createQueryBuilder("tokens").where("tokens.user = :user", { user }).andWhere("tokens.refresh_token = :refresh_token", { refresh_token }).getOne();
        return userToken;
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.createQueryBuilder("tokens").where("tokens.refresh_token = :refresh_token", { refresh_token }).getOne();
        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.createQueryBuilder().delete().where("id = :id", { id }).execute();
    }
};

export { UsersTokensRepository };