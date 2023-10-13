import { CategoryServicesImpl } from '@src/application/services/categories/category.services.impl';
import { ExamsServicesImpl } from '@src/application/services/exams/exam.services.impl';
import { UsersServicesImpl } from '@src/application/services/users/users.services.impl';
import ExamsCategoryEntity from '@src/domain/entities/exam.category.entity';
import ExamsEntity from '@src/domain/entities/exam.entity';
import UsersEntity from '@src/domain/entities/user.entity';
import { ExamsCategoryRepositoryImpl } from '@src/infrastructure/repositories/exam.category.repository.impl';
import { ExamsRepositoryImpl } from '@src/infrastructure/repositories/exam.repository.impl';
import { UsersRepositoryImpl } from '@src/infrastructure/repositories/users.repository.impl';
import { Router } from 'express';
import { AuthenticationsController } from '@src/main/controllers/authentications';
import roleRestrictTo from '@src/main/controllers/authentications/permission.controller';
import { ExamsController } from '@src/main/controllers/exams';
import { QuestionsRepositoryImpl } from '@src/infrastructure/repositories/questions.repository.impl';
import QuestionsEntity from '@src/domain/entities/question.entity';
import { QuestionsServicesImpl } from '@src/application/services/questions/questions.services.impl';
import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';
import { UserAnswerReporitoryImpl } from '@src/infrastructure/repositories/user.answer.repository.impl';
import { UserAnswerServicesImpl } from '@src/application/services/user-answer/user.answer.services.impl';
import { ExamRelationUserRepositoryImpl } from '@src/infrastructure/repositories/exam.user.repository.impl';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import { ExamRelationUserServicesImpl } from '@src/application/services/exam-user/exam.user.services.impl';

/** init repository */
const examsRepository = new ExamsRepositoryImpl(ExamsEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
const categoriesRepository = new ExamsCategoryRepositoryImpl(ExamsCategoryEntity);
const questionsRepository = new QuestionsRepositoryImpl(QuestionsEntity);
const userAnswerRepository = new UserAnswerReporitoryImpl(UserAnswerEntity);
const examUserRepository = new ExamRelationUserRepositoryImpl(ExamUserEntity);

/** init service */
const categoriesServices = new CategoryServicesImpl(categoriesRepository);
const examsServices = new ExamsServicesImpl(examsRepository);
const usersServices = new UsersServicesImpl(usersRepository);
const questionsServices = new QuestionsServicesImpl(questionsRepository);
const userAnswerServices = new UserAnswerServicesImpl(userAnswerRepository);
const examUserServices = new ExamRelationUserServicesImpl(examUserRepository);

/** init controller */
const examsController = new ExamsController(examsServices, categoriesServices, userAnswerServices, examUserServices);
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
    router.get('/exams/:examId', roleRestrictTo(['user', 'admin']), examsController.getExamById);
    // submit exam router
    router.post('/exams/submit', roleRestrictTo(['admin', 'user']), examsController.submitExam);
};
