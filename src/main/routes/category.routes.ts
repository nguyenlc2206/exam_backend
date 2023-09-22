import { Router } from 'express';

import { AuthenticationsController } from '../controllers/authentications';
import roleRestrictTo from '../controllers/authentications/permission.controller';
import { CategoryController } from '../controllers/categories';
import { CategoryServicesImpl } from '../../application/services/categories/category.services.impl';
import { UsersServicesImpl } from '../../application/services/users/users.services.impl';
import ExamsCategoryEntity from '../../domain/entities/exam.category.entity';
import UsersEntity from '../../domain/entities/user.entity';
import { ExamsCategoryRepositoryImpl } from '../../infrastructure/repositories/exam.category.repository.impl';
import { UsersRepositoryImpl } from '../../infrastructure/repositories/users.repository.impl';

/** init repository */
const categoriesRepository = new ExamsCategoryRepositoryImpl(ExamsCategoryEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const categoriesServices = new CategoryServicesImpl(categoriesRepository);
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const categoriesController = new CategoryController(categoriesServices);
const authController = new AuthenticationsController(usersServices);
/** init groups routes */
export const categoriesRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create group router
    router.post('/categories', roleRestrictTo(['admin']), categoriesController.create);
    // get All router
    router.get('/categories', roleRestrictTo(['admin']), categoriesController.getAll);
};
