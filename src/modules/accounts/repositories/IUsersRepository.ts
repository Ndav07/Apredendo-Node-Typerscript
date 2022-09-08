import { Users } from "../entities/Users";

interface ICreateUserDTO {
    name: string;
    username: string;
    passaword: string;
    email: string;
    drive_licence: string;
};

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;

};

export { IUsersRepository, ICreateUserDTO };