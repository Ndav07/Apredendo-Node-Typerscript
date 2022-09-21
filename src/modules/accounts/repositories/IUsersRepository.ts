import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface ICreateUserDTO {
    name: string;
    password: string;
    email: string;
    drive_license: string;
    id?: string;
    avatar?: string;
    isAdmin?: boolean;
};

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
};

export { IUsersRepository, ICreateUserDTO };