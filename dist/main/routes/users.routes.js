"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutesSetup = void 0;
const authentications_1 = require("../controllers/authentications");
const permission_controller_1 = __importDefault(require("../controllers/authentications/permission.controller"));
const users_1 = require("../controllers/users");
const users_services_impl_1 = require("../../application/services/users/users.services.impl");
const user_entity_1 = __importDefault(require("../../domain/entities/user.entity"));
const users_repository_impl_1 = require("../../infrastructure/repositories/users.repository.impl");
/** init repository */
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
/** init service */
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
/** init controller */
const usersController = new users_1.UsersController(usersServices);
const authController = new authentications_1.AuthenticationsController(usersServices);
/** init users routes */
const usersRoutesSetup = (router) => {
    // protect routes
    router.use(authController.protect);
    // get all router
    router.get('/users', (0, permission_controller_1.default)(['admin']), usersController.getAll);
    // delete router
    router.delete('/user/:id', (0, permission_controller_1.default)(['admin']), usersController.delete);
};
exports.usersRoutesSetup = usersRoutesSetup;
