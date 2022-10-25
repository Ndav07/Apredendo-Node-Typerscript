import { DataSource, Repository } from "typeorm";

import { PostgresConnectDataBase } from "@shared/infra/typeorm/data-source";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository, ICreateUserDTO } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private connectionDataBase: DataSource;
    private repository : Repository<User>;

    constructor() {
        this.connectionDataBase = PostgresConnectDataBase;
        this.repository = this.connectionDataBase.getRepository(User);
    }

    async create({ name, email, drive_license, password, id, avatar, isAdmin }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({ name, email, drive_license, password, id, avatar, isAdmin });
        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: {email: email} });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ 
            where: {id: id},
        });
        return user;
    }

    async updatePassword(password: string, id: string): Promise<void> {
        await this.repository.createQueryBuilder().update().set({ password: password }).where("id = :id", { id }).execute()
    }
};

export { UsersRepository };