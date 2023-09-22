"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionsRoutesSetup = void 0;
const authentications_1 = require("../controllers/authentications");
const permission_controller_1 = __importDefault(require("../controllers/authentications/permission.controller"));
const questions_1 = require("../controllers/questions");
const exam_services_impl_1 = require("../../application/services/exams/exam.services.impl");
const questions_services_impl_1 = require("../../application/services/questions/questions.services.impl");
const users_services_impl_1 = require("../../application/services/users/users.services.impl");
const exam_entity_1 = __importDefault(require("../../domain/entities/exam.entity"));
const question_entity_1 = __importDefault(require("../../domain/entities/question.entity"));
const user_entity_1 = __importDefault(require("../../domain/entities/user.entity"));
const exam_repository_impl_1 = require("../../infrastructure/repositories/exam.repository.impl");
const questions_repository_impl_1 = require("../../infrastructure/repositories/questions.repository.impl");
const users_repository_impl_1 = require("../../infrastructure/repositories/users.repository.impl");
/** init repository */
const questionsRepository = new questions_repository_impl_1.QuestionsRepositoryImpl(question_entity_1.default);
const examsRepository = new exam_repository_impl_1.ExamsRepositoryImpl(exam_entity_1.default);
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
/** init service */
const questionsServices = new questions_services_impl_1.QuestionsServicesImpl(questionsRepository);
const examsServices = new exam_services_impl_1.ExamsServicesImpl(examsRepository);
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
/** init controller */
const questionsController = new questions_1.QuestionsController(examsServices, questionsServices);
const authController = new authentications_1.AuthenticationsController(usersServices);
/** init questions routes */
const questionsRoutesSetup = (router) => {
    // protect routes
    router.use(authController.protect);
    // create question router
    router.post('/questions', (0, permission_controller_1.default)(['user', 'admin']), questionsController.create);
    // create question router
    router.get('/questions', (0, permission_controller_1.default)(['user', 'admin']), questionsController.getAll);
    // create question router
    router.delete('/questions/:id', (0, permission_controller_1.default)(['user', 'admin']), questionsController.delete);
};
exports.questionsRoutesSetup = questionsRoutesSetup;
