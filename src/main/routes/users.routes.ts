import { Router } from 'express';

import { AuthenticationsController } from '../controllers/authentications';
import roleRestrictTo from '../controllers/authentications/permission.controller';
import { UsersController } from '../controllers/users';
import { UsersServicesImpl } from '../../application/services/users/users.services.impl';
import UsersEntity from '../../domain/entities/user.entity';
import { UsersRepositoryImpl } from '../../infrastructure/repositories/users.repository.impl';

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
