import { GroupsServicesImpl } from '@src/application/services/groups/groups.services.impl';
import { UsersServicesImpl } from '@src/application/services/users/users.services.impl';
import GroupsEntity from '@src/domain/entities/group.entity';
import UsersEntity from '@src/domain/entities/user.entity';
import { GroupsRepositoryImpl } from '@src/infrastructure/repositories/groups.repository.impl';
import { UsersRepositoryImpl } from '@src/infrastructure/repositories/users.repository.impl';
import { Router } from 'express';
import { AuthenticationsController } from '@src/main/controllers/authentications';
import { GroupsController } from '@src/main/controllers/authentications/groups';
import roleRestrictTo from '@src/main/controllers/authentications/permission.controller';

/** init repository */
const groupsRepository = new GroupsRepositoryImpl(GroupsEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const groupsServices = new GroupsServicesImpl(groupsRepository);
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const groupsController = new GroupsController(groupsServices);
const authController = new AuthenticationsController(usersServices);
/** init groups routes */
export const groupsRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create group router
    router.post('/groups', roleRestrictTo(['admin']), groupsController.create);
    // update group router
    router.patch('/groups', roleRestrictTo(['admin']), groupsController.update);
    // getAll groups router
    router.get('/groups', roleRestrictTo(['admin']), groupsController.getAll);
    // getById groups router
    router.get('/groups/:id', roleRestrictTo(['admin']), groupsController.getById);
};
