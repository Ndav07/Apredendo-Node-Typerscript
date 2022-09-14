import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IUser_id {
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        throw new AppError("Token missing", 401);
    }
    
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(token, "13574ef0d58b50fab38ec841efe39df4") as IUser_id;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);
        
        if(!user) {
            throw new AppError("User does not exists!", 401);
        }

        req.user = {
            id: user_id
        }

        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}