import { Router } from 'express';

import { AuthenticationsController } from '../controllers/authentications';
import roleRestrictTo from '../controllers/authentications/permission.controller';
import { QuestionsController } from '../controllers/questions';
import { ExamsServicesImpl } from '../../application/services/exams/exam.services.impl';
import { QuestionsServicesImpl } from '../../application/services/questions/questions.services.impl';
import { UsersServicesImpl } from '../../application/services/users/users.services.impl';
import ExamsEntity from '../../domain/entities/exam.entity';
import QuestionsEntity from '../../domain/entities/question.entity';
import UsersEntity from '../../domain/entities/user.entity';
import { ExamsRepositoryImpl } from '../../infrastructure/repositories/exam.repository.impl';
import { QuestionsRepositoryImpl } from '../../infrastructure/repositories/questions.repository.impl';
import { UsersRepositoryImpl } from '../../infrastructure/repositories/users.repository.impl';

/** init repository */
const questionsRepository = new QuestionsRepositoryImpl(QuestionsEntity);
const examsRepository = new ExamsRepositoryImpl(ExamsEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const questionsServices = new QuestionsServicesImpl(questionsRepository);
const examsServices = new ExamsServicesImpl(examsRepository);
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const questionsController = new QuestionsController(examsServices, questionsServices);
const authController = new AuthenticationsController(usersServices);
/** init questions routes */
export const questionsRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create question router
    router.post('/questions', roleRestrictTo(['user', 'admin']), questionsController.create);
    // create question router
    router.get('/questions', roleRestrictTo(['user', 'admin']), questionsController.getAll);
    // create question router
    router.delete('/questions/:id', roleRestrictTo(['user', 'admin']), questionsController.delete);
};
