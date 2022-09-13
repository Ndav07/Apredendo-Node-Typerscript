import { Users } from "../entities/Users";

interface ICreateUserDTO {
    name: string;
    passaword: string;
    email: string;
    drive_licence: string;
    id?: string;
    avatar?: string;
};

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<Users>;
    findById(id: string): Promise<Users>;
};

export { IUsersRepository, ICreateUserDTO };