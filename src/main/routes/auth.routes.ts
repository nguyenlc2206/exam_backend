import { Router } from "express";
import { UsersController } from "../controllers/users";
import { AuthenticationsController } from "../controllers/authentications";
import UsersEntity from "src/domain/entities/user.entity";
import { UsersRepositoryImpl } from "src/infrastructure/repositories/users.repository.impl";
import { UsersServicesImpl } from "src/application/services/users/users.services.impl";

/** init repository */
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const usersController = new UsersController(usersServices);
const authController = new AuthenticationsController(usersServices);
/** init routes auth */
export const authRoutesSetup = (router: Router) => {
    // register router
    router.post("/register", usersController.create);
    // login router
    router.post("/login", authController.login);
    // tempo token router
    router.post("/tempo-token", authController.getTempToken);
    // forgot password router
    router.post("/forgot-password", authController.forgotPassword);
    // change password router
    router.use(authController.protect),
        router.patch("/change-password", authController.changePassword),
        router.post("/refresh-token", authController.refreshToken);
};
