import { UsersServicesImpl } from '@src/application/services/users/users.services.impl';
import UsersEntity from '@src/domain/entities/user.entity';
import { UsersRepositoryImpl } from '@src/infrastructure/repositories/users.repository.impl';
import { Router } from 'express';
import { AuthenticationsController } from '@src/main/controllers/authentications';
import roleRestrictTo from '@src/main/controllers/authentications/permission.controller';
import { UsersController } from '@src/main/controllers/users';

/** init repository */
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const usersController = new UsersController(usersServices);
const authController = new AuthenticationsController(usersServices);
/** init users routes */
export const usersRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // get all router
    router.get('/users', roleRestrictTo(['admin']), usersController.getAll);
    // delete router
    router.delete('/user/:id', roleRestrictTo(['admin']), usersController.delete);
};
