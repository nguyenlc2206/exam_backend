import { ExamRelationUserServicesImpl } from '@src/application/services/exam-user/exam.user.services.impl';
import { ExamsServicesImpl } from '@src/application/services/exams/exam.services.impl';
import { UsersServicesImpl } from '@src/application/services/users/users.services.impl';
import ExamsEntity from '@src/domain/entities/exam.entity';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import UsersEntity from '@src/domain/entities/user.entity';
import { ExamsRepositoryImpl } from '@src/infrastructure/repositories/exam.repository.impl';
import { ExamRelationUserRepositoryImpl } from '@src/infrastructure/repositories/exam.user.repository.impl';
import { UsersRepositoryImpl } from '@src/infrastructure/repositories/users.repository.impl';
import { Router } from 'express';
import { AuthenticationsController } from '@src/main/controllers/authentications';
import roleRestrictTo from '@src/main/controllers/authentications/permission.controller';
import { ExamRelationUserController } from '@src/main/controllers/exam-user';

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
    // get all exams by user id
    router.get('/exams-user/:userId', roleRestrictTo(['user', 'admin']), examUserController.getByUserId);
    // get all exams by admin
    router.get('/exams-admin', roleRestrictTo(['admin']), examUserController.getAllByAdmin);
    // create exam user router
    router.post('/exam-user', roleRestrictTo(['admin']), examUserController.create);
};
