import { Router } from 'express';

import { AuthenticationsController } from '../controllers/authentications';
import roleRestrictTo from '../controllers/authentications/permission.controller';
import { ExamRelationUserController } from '../controllers/exam-user';
import { ExamRelationUserServicesImpl } from '../../application/services/exam-user/exam.user.services.impl';
import { ExamsServicesImpl } from '../../application/services/exams/exam.services.impl';
import { UsersServicesImpl } from '../../application/services/users/users.services.impl';
import ExamsEntity from '../../domain/entities/exam.entity';
import ExamUserEntity from '../../domain/entities/examUser.entity';
import UsersEntity from '../../domain/entities/user.entity';
import { ExamsRepositoryImpl } from '../../infrastructure/repositories/exam.repository.impl';
import { ExamRelationUserRepositoryImpl } from '../../infrastructure/repositories/exam.user.repository.impl';
import { UsersRepositoryImpl } from '../../infrastructure/repositories/users.repository.impl';

/** init repository */
const examsRepository = new ExamsRepositoryImpl(ExamsEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
const examUserRepository = new ExamRelationUserRepositoryImpl(ExamUserEntity);
/** init service */
const examsServices = new ExamsServicesImpl(examsRepository);
const usersServices = new UsersServicesImpl(usersRepository);
const examUserServices = new ExamRelationUserServicesImpl(examUserRepository);
/** init controller */
const authController = new AuthenticationsController(usersServices);
const examUserController = new ExamRelationUserController(examsServices, usersServices, examUserServices);
/** init exam user routes */
export const examUserRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // get all exams by user id
    router.get('/exams-user', roleRestrictTo(['user', 'admin']), examUserController.getAllByUserId);
    // get all exams by admin
    router.get('/exams-admin', roleRestrictTo(['admin']), examUserController.getAllByAdmin);
    // create exam user router
    router.post('/exam-user', roleRestrictTo(['admin']), examUserController.create);
};
