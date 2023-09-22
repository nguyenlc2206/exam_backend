import { Router } from 'express';
import { CategoryServicesImpl } from '~/application/services/categories/category.services.impl';
import { ExamsServicesImpl } from '~/application/services/exams/exam.services.impl';
import { UsersServicesImpl } from '~/application/services/users/users.services.impl';
import ExamsCategoryEntity from '~/domain/entities/exam.category.entity';
import ExamsEntity from '~/domain/entities/exam.entity';
import UsersEntity from '~/domain/entities/user.entity';
import { ExamsCategoryRepositoryImpl } from '~/infrastructure/repositories/exam.category.repository.impl';
import { ExamsRepositoryImpl } from '~/infrastructure/repositories/exam.repository.impl';
import { UsersRepositoryImpl } from '~/infrastructure/repositories/users.repository.impl';
import { AuthenticationsController } from '../controllers/authentications';
import roleRestrictTo from '../controllers/authentications/permission.controller';
import { ExamsController } from '../controllers/exams';

/** init repository */
const examsRepository = new ExamsRepositoryImpl(ExamsEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
const categoriesRepository = new ExamsCategoryRepositoryImpl(ExamsCategoryEntity);
/** init service */
const categoriesServices = new CategoryServicesImpl(categoriesRepository);
const examsServices = new ExamsServicesImpl(examsRepository);
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const examsController = new ExamsController(examsServices, categoriesServices);
const authController = new AuthenticationsController(usersServices);
/** init groups routes */
export const examsRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create exam router
    router.post('/exams', roleRestrictTo(['admin']), examsController.create);
    // update exam router
    router.patch('/exams', roleRestrictTo(['admin']), examsController.update);
    // getAll exams router
    router.get('/exams', roleRestrictTo(['admin']), examsController.getAll);
    // get exam by id router
    router.get('/exams/:id', roleRestrictTo(['admin']), examsController.getExamById);
};
