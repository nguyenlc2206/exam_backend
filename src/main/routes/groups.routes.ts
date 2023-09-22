import { Router } from 'express';
import { GroupsServicesImpl } from '~/application/services/groups/groups.services.impl';
import { UsersServicesImpl } from '~/application/services/users/users.services.impl';
import GroupsEntity from '~/domain/entities/group.entity';
import UsersEntity from '~/domain/entities/user.entity';
import { GroupsRepositoryImpl } from '~/infrastructure/repositories/groups.repository.impl';
import { UsersRepositoryImpl } from '~/infrastructure/repositories/users.repository.impl';
import { AuthenticationsController } from '../controllers/authentications';
import { GroupsController } from '../controllers/authentications/groups';
import roleRestrictTo from '../controllers/authentications/permission.controller';

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
};
