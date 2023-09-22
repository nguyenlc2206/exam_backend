import { Router } from 'express';

import { AnswersController } from '../controllers/answers';
import { AuthenticationsController } from '../controllers/authentications';
import roleRestrictTo from '../controllers/authentications/permission.controller';
import { AnwsersServicesImpl } from '../../application/services/answers/answers.services.impl';
import { QuestionsServicesImpl } from '../../application/services/questions/questions.services.impl';
import { UsersServicesImpl } from '../../application/services/users/users.services.impl';
import AnswersEntity from '../../domain/entities/answer.entity';
import QuestionsEntity from '../../domain/entities/question.entity';
import UsersEntity from '../../domain/entities/user.entity';
import { AnwsersRepositoryImpl } from '../../infrastructure/repositories/answers.repository.impl';
import { QuestionsRepositoryImpl } from '../../infrastructure/repositories/questions.repository.impl';
import { UsersRepositoryImpl } from '../../infrastructure/repositories/users.repository.impl';

/** init repository */
const questionsRepository = new QuestionsRepositoryImpl(QuestionsEntity);
const answersRepository = new AnwsersRepositoryImpl(AnswersEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const questionsServices = new QuestionsServicesImpl(questionsRepository);
const answersServices = new AnwsersServicesImpl(answersRepository);
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const answersController = new AnswersController(answersServices, questionsServices);
const authController = new AuthenticationsController(usersServices);
/** init answers routes */
export const answersRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create answer router
    router.post('/anwsers', roleRestrictTo(['admin']), answersController.create);
    // delete answer router
    router.delete('/anwsers/:id', roleRestrictTo(['admin']), answersController.delete);
};
