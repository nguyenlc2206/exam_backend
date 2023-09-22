"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examUserRoutesSetup = void 0;
const authentications_1 = require("../controllers/authentications");
const permission_controller_1 = __importDefault(require("../controllers/authentications/permission.controller"));
const exam_user_1 = require("../controllers/exam-user");
const exam_user_services_impl_1 = require("../../application/services/exam-user/exam.user.services.impl");
const exam_services_impl_1 = require("../../application/services/exams/exam.services.impl");
const users_services_impl_1 = require("../../application/services/users/users.services.impl");
const exam_entity_1 = __importDefault(require("../../domain/entities/exam.entity"));
const examUser_entity_1 = __importDefault(require("../../domain/entities/examUser.entity"));
const user_entity_1 = __importDefault(require("../../domain/entities/user.entity"));
const exam_repository_impl_1 = require("../../infrastructure/repositories/exam.repository.impl");
const exam_user_repository_impl_1 = require("../../infrastructure/repositories/exam.user.repository.impl");
const users_repository_impl_1 = require("../../infrastructure/repositories/users.repository.impl");
/** init repository */
const examsRepository = new exam_repository_impl_1.ExamsRepositoryImpl(exam_entity_1.default);
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
const examUserRepository = new exam_user_repository_impl_1.ExamRelationUserRepositoryImpl(examUser_entity_1.default);
/** init service */
const examsServices = new exam_services_impl_1.ExamsServicesImpl(examsRepository);
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
const examUserServices = new exam_user_services_impl_1.ExamRelationUserServicesImpl(examUserRepository);
/** init controller */
const authController = new authentications_1.AuthenticationsController(usersServices);
const examUserController = new exam_user_1.ExamRelationUserController(examsServices, usersServices, examUserServices);
/** init exam user routes */
const examUserRoutesSetup = (router) => {
    // protect routes
    router.use(authController.protect);
    // get all exams by user id
    router.get('/exams-user', (0, permission_controller_1.default)(['user', 'admin']), examUserController.getAllByUserId);
    // get all exams by admin
    router.get('/exams-admin', (0, permission_controller_1.default)(['admin']), examUserController.getAllByAdmin);
    // create exam user router
    router.post('/exam-user', (0, permission_controller_1.default)(['admin']), examUserController.create);
};
exports.examUserRoutesSetup = examUserRoutesSetup;
