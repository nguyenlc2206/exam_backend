"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.answersRoutesSetup = void 0;
const answers_1 = require("../controllers/answers");
const authentications_1 = require("../controllers/authentications");
const permission_controller_1 = __importDefault(require("../controllers/authentications/permission.controller"));
const answers_services_impl_1 = require("../../application/services/answers/answers.services.impl");
const questions_services_impl_1 = require("../../application/services/questions/questions.services.impl");
const users_services_impl_1 = require("../../application/services/users/users.services.impl");
const answer_entity_1 = __importDefault(require("../../domain/entities/answer.entity"));
const question_entity_1 = __importDefault(require("../../domain/entities/question.entity"));
const user_entity_1 = __importDefault(require("../../domain/entities/user.entity"));
const answers_repository_impl_1 = require("../../infrastructure/repositories/answers.repository.impl");
const questions_repository_impl_1 = require("../../infrastructure/repositories/questions.repository.impl");
const users_repository_impl_1 = require("../../infrastructure/repositories/users.repository.impl");
/** init repository */
const questionsRepository = new questions_repository_impl_1.QuestionsRepositoryImpl(question_entity_1.default);
const answersRepository = new answers_repository_impl_1.AnwsersRepositoryImpl(answer_entity_1.default);
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
/** init service */
const questionsServices = new questions_services_impl_1.QuestionsServicesImpl(questionsRepository);
const answersServices = new answers_services_impl_1.AnwsersServicesImpl(answersRepository);
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
/** init controller */
const answersController = new answers_1.AnswersController(answersServices, questionsServices);
const authController = new authentications_1.AuthenticationsController(usersServices);
/** init answers routes */
const answersRoutesSetup = (router) => {
    // protect routes
    router.use(authController.protect);
    // create answer router
    router.post('/anwsers', (0, permission_controller_1.default)(['admin']), answersController.create);
    // delete answer router
    router.delete('/anwsers/:id', (0, permission_controller_1.default)(['admin']), answersController.delete);
};
exports.answersRoutesSetup = answersRoutesSetup;
