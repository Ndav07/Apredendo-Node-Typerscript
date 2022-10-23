import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCase/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCase/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.hadle);
authenticateRoutes.post("/refreshToken", refreshTokenController.handle);

export { authenticateRoutes };