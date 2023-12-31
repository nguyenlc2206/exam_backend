import { ExamsServicesImpl } from '@src/application/services/exams/exam.services.impl';
import { QuestionsServicesImpl } from '@src/application/services/questions/questions.services.impl';
import { UsersServicesImpl } from '@src/application/services/users/users.services.impl';
import ExamsEntity from '@src/domain/entities/exam.entity';
import QuestionsEntity from '@src/domain/entities/question.entity';
import UsersEntity from '@src/domain/entities/user.entity';
import { ExamsRepositoryImpl } from '@src/infrastructure/repositories/exam.repository.impl';
import { QuestionsRepositoryImpl } from '@src/infrastructure/repositories/questions.repository.impl';
import { UsersRepositoryImpl } from '@src/infrastructure/repositories/users.repository.impl';
import { Router } from 'express';
import { AuthenticationsController } from '@src/main/controllers/authentications';
import roleRestrictTo from '@src/main/controllers/authentications/permission.controller';
import { QuestionsController } from '@src/main/controllers/questions';
import { UserAnswerReporitoryImpl } from '@src/infrastructure/repositories/user.answer.repository.impl';
import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';
import { ExamRelationUserRepositoryImpl } from '@src/infrastructure/repositories/exam.user.repository.impl';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import { UserAnswerServicesImpl } from '@src/application/services/user-answer/user.answer.services.impl';
import { ExamRelationUserServicesImpl } from '@src/application/services/exam-user/exam.user.services.impl';

/** init repository */
const questionsRepository = new QuestionsRepositoryImpl(QuestionsEntity);
const examsRepository = new ExamsRepositoryImpl(ExamsEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
const userAnswerRepository = new UserAnswerReporitoryImpl(UserAnswerEntity);
const examUserRepository = new ExamRelationUserRepositoryImpl(ExamUserEntity);

/** init service */
const questionsServices = new QuestionsServicesImpl(questionsRepository);
const examsServices = new ExamsServicesImpl(examsRepository);
const usersServices = new UsersServicesImpl(usersRepository);

const userAnswerServices = new UserAnswerServicesImpl(userAnswerRepository);
const examUserServices = new ExamRelationUserServicesImpl(examUserRepository);

/** init controller */
const questionsController = new QuestionsController(
    examsServices,
    questionsServices,
    userAnswerServices,
    examUserServices
);
const authController = new AuthenticationsController(usersServices);
/** init questions routes */
export const questionsRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create question router
    router.post('/questions', roleRestrictTo(['admin']), questionsController.create);
    // create question router
    router.get('/questions', roleRestrictTo(['admin']), questionsController.getAll);
    // create question router
    router.delete('/questions/:id', roleRestrictTo(['admin']), questionsController.delete);
    // get questions router
    router.get('/questions/:examId', roleRestrictTo(['admin']), questionsController.getQuestionsByExamId);
    // restore questions router
    router.post('/questions/:id', roleRestrictTo(['admin']), questionsController.restore);
};
