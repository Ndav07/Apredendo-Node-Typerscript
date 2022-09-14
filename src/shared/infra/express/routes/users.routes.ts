import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "@shared/infra/express/middlewares/ensureAuthenticated";
import { CreateUserController } from "@modules/accounts/useCase/createUseCase/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController";

const usersRouter = Router();

const uploadAvater = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post("/", createUserController.handle);

usersRouter.patch("/avatar", ensureAuthenticated, uploadAvater.single("avatar"), updateUserAvatarController.handle);

export { usersRouter };