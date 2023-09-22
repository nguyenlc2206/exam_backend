"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutesSetup = void 0;
const users_services_impl_1 = require("~/application/services/users/users.services.impl");
const user_entity_1 = __importDefault(require("~/domain/entities/user.entity"));
const users_repository_impl_1 = require("~/infrastructure/repositories/users.repository.impl");
const authentications_1 = require("../controllers/authentications");
const users_1 = require("../controllers/users");
/** init repository */
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
/** init service */
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
/** init controller */
const usersController = new users_1.UsersController(usersServices);
const authController = new authentications_1.AuthenticationsController(usersServices);
/** init routes auth */
const authRoutesSetup = (router) => {
    // register router
    router.post('/register', usersController.create);
    // login router
    router.post('/login', authController.login);
    // tempo token router
    router.post('/tempo-token', authController.getTempToken);
    // forgot password router
    router.post('/forgot-password', authController.forgotPassword);
    // change password router
    router.use(authController.protect),
        router.patch('/change-password', authController.changePassword),
        router.post('/refresh-token', authController.refreshToken);
};
exports.authRoutesSetup = authRoutesSetup;
