import { Router } from 'express';
import { RoleServicesImpl } from '~/application/services/roles/roles.services.impl';
import { UsersServicesImpl } from '~/application/services/users/users.services.impl';
import RolesEntity from '~/domain/entities/role.entity';
import UsersEntity from '~/domain/entities/user.entity';
import { RolesRepositoryImpl } from '~/infrastructure/repositories/roles.repository.impl';
import { UsersRepositoryImpl } from '~/infrastructure/repositories/users.repository.impl';
import { AuthenticationsController } from '../controllers/authentications';
import roleRestrictTo from '../controllers/authentications/permission.controller';
import { RolesController } from '../controllers/authentications/roles';

/** init repository */
const rolesRepository = new RolesRepositoryImpl(RolesEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const rolesServices = new RoleServicesImpl(rolesRepository);
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const rolesController = new RolesController(rolesServices);
const authController = new AuthenticationsController(usersServices);
/** init roles routes */
export const rolesRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create role router
    router.post('/roles', roleRestrictTo(['admin']), rolesController.create);
    // update role router
    router.patch('/roles', roleRestrictTo(['admin']), rolesController.update);
    // get all roles
    router.get('/roles', roleRestrictTo(['admin']), rolesController.getAll);
    // delete roles
    router.delete('/roles/:id', roleRestrictTo(['admin']), rolesController.delete);
};
