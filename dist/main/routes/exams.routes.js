"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.examsRoutesSetup = void 0;
const category_services_impl_1 = require("~/application/services/categories/category.services.impl");
const exam_services_impl_1 = require("~/application/services/exams/exam.services.impl");
const users_services_impl_1 = require("~/application/services/users/users.services.impl");
const exam_category_entity_1 = __importDefault(require("~/domain/entities/exam.category.entity"));
const exam_entity_1 = __importDefault(require("~/domain/entities/exam.entity"));
const user_entity_1 = __importDefault(require("~/domain/entities/user.entity"));
const exam_category_repository_impl_1 = require("~/infrastructure/repositories/exam.category.repository.impl");
const exam_repository_impl_1 = require("~/infrastructure/repositories/exam.repository.impl");
const users_repository_impl_1 = require("~/infrastructure/repositories/users.repository.impl");
const authentications_1 = require("../controllers/authentications");
const permission_controller_1 = __importDefault(require("../controllers/authentications/permission.controller"));
const exams_1 = require("../controllers/exams");
/** init repository */
const examsRepository = new exam_repository_impl_1.ExamsRepositoryImpl(exam_entity_1.default);
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
const categoriesRepository = new exam_category_repository_impl_1.ExamsCategoryRepositoryImpl(exam_category_entity_1.default);
/** init service */
const categoriesServices = new category_services_impl_1.CategoryServicesImpl(categoriesRepository);
const examsServices = new exam_services_impl_1.ExamsServicesImpl(examsRepository);
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
/** init controller */
const examsController = new exams_1.ExamsController(examsServices, categoriesServices);
const authController = new authentications_1.AuthenticationsController(usersServices);
/** init groups routes */
const examsRoutesSetup = (router) => {
    // protect routes
    router.use(authController.protect);
    // create exam router
    router.post('/exams', (0, permission_controller_1.default)(['admin']), examsController.create);
    // update exam router
    router.patch('/exams', (0, permission_controller_1.default)(['admin']), examsController.update);
    // getAll exams router
    router.get('/exams', (0, permission_controller_1.default)(['admin']), examsController.getAll);
    // get exam by id router
    router.get('/exams/:id', (0, permission_controller_1.default)(['admin']), examsController.getExamById);
};
exports.examsRoutesSetup = examsRoutesSetup;
