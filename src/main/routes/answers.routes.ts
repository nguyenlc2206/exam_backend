import { Router } from "express";

import { AnswersController } from "../controllers/answers";
import { AuthenticationsController } from "../controllers/authentications";
import roleRestrictTo from "../controllers/authentications/permission.controller";
import { QuestionsRepositoryImpl } from "src/infrastructure/repositories/questions.repository.impl";
import QuestionsEntity from "src/domain/entities/question.entity";
import { AnwsersRepositoryImpl } from "src/infrastructure/repositories/answers.repository.impl";
import AnswersEntity from "src/domain/entities/answer.entity";
import { UsersRepositoryImpl } from "src/infrastructure/repositories/users.repository.impl";
import UsersEntity from "src/domain/entities/user.entity";
import { QuestionsServicesImpl } from "src/application/services/questions/questions.services.impl";
import { AnwsersServicesImpl } from "src/application/services/answers/answers.services.impl";
import { UsersServicesImpl } from "src/application/services/users/users.services.impl";

/** init repository */
const questionsRepository = new QuestionsRepositoryImpl(QuestionsEntity);
const answersRepository = new AnwsersRepositoryImpl(AnswersEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const questionsServices = new QuestionsServicesImpl(questionsRepository);
const answersServices = new AnwsersServicesImpl(answersRepository);
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const answersController = new AnswersController(
    answersServices,
    questionsServices
);
const authController = new AuthenticationsController(usersServices);
/** init answers routes */
export const answersRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create answer router
    router.post(
        "/anwsers",
        roleRestrictTo(["admin"]),
        answersController.create
    );
    // delete answer router
    router.delete(
        "/anwsers/:id",
        roleRestrictTo(["admin"]),
        answersController.delete
    );
};
