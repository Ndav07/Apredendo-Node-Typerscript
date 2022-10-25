import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO, IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class InMemoryUsersRepository implements IUsersRepository {
    updatePassword(password: string, id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    users: User[] = [];

    async create({ name, drive_license, email, password }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, { name, drive_license, email, password });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id);
        return user;
    }
};

export { InMemoryUsersRepository };