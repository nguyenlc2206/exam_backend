import { Router } from 'express';
import { UsersServicesImpl } from '~/application/services/users/users.services.impl';
import UsersEntity from '~/domain/entities/user.entity';
import { UsersRepositoryImpl } from '~/infrastructure/repositories/users.repository.impl';
import { AuthenticationsController } from '../controllers/authentications';
import { UsersController } from '../controllers/users';

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
    router.post('/register', usersController.create);
    // login router
    router.post('/login', authController.login);
    // tempo token router
    router.post('/tempo-token', authController.getTempToken);
    // forgot password router
    router.post('/forgot-password', authController.forgotPassword);
    // change password router
    router.use(authController.protect),
        router.patch('/change-password', authController.changePassword),
        router.post('/refresh-token', authController.refreshToken);
};
