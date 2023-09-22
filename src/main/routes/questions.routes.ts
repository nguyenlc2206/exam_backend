import { Router } from "express";

import { AuthenticationsController } from "../controllers/authentications";
import roleRestrictTo from "../controllers/authentications/permission.controller";
import { ExamsServicesImpl } from "src/application/services/exams/exam.services.impl";
import { QuestionsServicesImpl } from "src/application/services/questions/questions.services.impl";
import { UsersServicesImpl } from "src/application/services/users/users.services.impl";
import ExamsEntity from "src/domain/entities/exam.entity";
import QuestionsEntity from "src/domain/entities/question.entity";
import UsersEntity from "src/domain/entities/user.entity";
import { ExamsRepositoryImpl } from "src/infrastructure/repositories/exam.repository.impl";
import { QuestionsRepositoryImpl } from "src/infrastructure/repositories/questions.repository.impl";
import { UsersRepositoryImpl } from "src/infrastructure/repositories/users.repository.impl";
import { QuestionsController } from "../controllers/questions";

/** init repository */
const questionsRepository = new QuestionsRepositoryImpl(QuestionsEntity);
const examsRepository = new ExamsRepositoryImpl(ExamsEntity);
const usersRepository = new UsersRepositoryImpl(UsersEntity);
/** init service */
const questionsServices = new QuestionsServicesImpl(questionsRepository);
const examsServices = new ExamsServicesImpl(examsRepository);
const usersServices = new UsersServicesImpl(usersRepository);
/** init controller */
const questionsController = new QuestionsController(
    examsServices,
    questionsServices
);
const authController = new AuthenticationsController(usersServices);
/** init questions routes */
export const questionsRoutesSetup = (router: Router) => {
    // protect routes
    router.use(authController.protect);
    // create question router
    router.post(
        "/questions",
        roleRestrictTo(["user", "admin"]),
        questionsController.create
    );
    // create question router
    router.get(
        "/questions",
        roleRestrictTo(["user", "admin"]),
        questionsController.getAll
    );
    // create question router
    router.delete(
        "/questions/:id",
        roleRestrictTo(["user", "admin"]),
        questionsController.delete
    );
};
