import { AppError } from "@errors/AppError";
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserUseCase } from "@modules/accounts/useCase/createUseCase/CreateUserUseCase";
import { AuthenticateUserUseCase } from "@modules/accounts/useCase/authenticateUser/AuthenticateUserUseCase";

describe("Authenticate user", () => {

    let inMemoryUsersRepository: InMemoryUsersRepository;
    let authenticateUseCase: AuthenticateUserUseCase;
    let createUserUseCase: CreateUserUseCase;
    let user: ICreateUserDTO;

    beforeEach(() => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        authenticateUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
        user = {
            drive_licence: "000123",
            email: "user@test.com",
            password: "1234",
            name: "user test"
        };
    });

    it("should be able to authenticate an user", async () => {
        await createUserUseCase.execute(user);
        
        const userAthenticate = await authenticateUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(userAthenticate).toHaveProperty("token");
    });

    it("should not be able to authenticate an no existent user", () => {
        expect(async () => {
            await authenticateUseCase.execute({
                email: "false@email.com",
                password: "falsepassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", async () => {
        await createUserUseCase.execute(user);

        expect(async () => {
            await authenticateUseCase.execute({
                email: user.email,
                password: "falsepassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect email", async () => {
        await createUserUseCase.execute(user);

        expect(async () => {
            await authenticateUseCase.execute({
                email: "false@email.com",
                password: user.password
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});