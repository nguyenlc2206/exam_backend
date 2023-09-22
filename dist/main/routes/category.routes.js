"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutesSetup = void 0;
const category_services_impl_1 = require("~/application/services/categories/category.services.impl");
const users_services_impl_1 = require("~/application/services/users/users.services.impl");
const exam_category_entity_1 = __importDefault(require("~/domain/entities/exam.category.entity"));
const user_entity_1 = __importDefault(require("~/domain/entities/user.entity"));
const exam_category_repository_impl_1 = require("~/infrastructure/repositories/exam.category.repository.impl");
const users_repository_impl_1 = require("~/infrastructure/repositories/users.repository.impl");
const authentications_1 = require("../controllers/authentications");
const permission_controller_1 = __importDefault(require("../controllers/authentications/permission.controller"));
const categories_1 = require("../controllers/categories");
/** init repository */
const categoriesRepository = new exam_category_repository_impl_1.ExamsCategoryRepositoryImpl(exam_category_entity_1.default);
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
/** init service */
const categoriesServices = new category_services_impl_1.CategoryServicesImpl(categoriesRepository);
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
/** init controller */
const categoriesController = new categories_1.CategoryController(categoriesServices);
const authController = new authentications_1.AuthenticationsController(usersServices);
/** init groups routes */
const categoriesRoutesSetup = (router) => {
    // protect routes
    router.use(authController.protect);
    // create group router
    router.post('/categories', (0, permission_controller_1.default)(['admin']), categoriesController.create);
    // get All router
    router.get('/categories', (0, permission_controller_1.default)(['admin']), categoriesController.getAll);
};
exports.categoriesRoutesSetup = categoriesRoutesSetup;
