"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesRoutesSetup = void 0;
const roles_services_impl_1 = require("~/application/services/roles/roles.services.impl");
const users_services_impl_1 = require("~/application/services/users/users.services.impl");
const role_entity_1 = __importDefault(require("~/domain/entities/role.entity"));
const user_entity_1 = __importDefault(require("~/domain/entities/user.entity"));
const roles_repository_impl_1 = require("~/infrastructure/repositories/roles.repository.impl");
const users_repository_impl_1 = require("~/infrastructure/repositories/users.repository.impl");
const authentications_1 = require("../controllers/authentications");
const permission_controller_1 = __importDefault(require("../controllers/authentications/permission.controller"));
const roles_1 = require("../controllers/authentications/roles");
/** init repository */
const rolesRepository = new roles_repository_impl_1.RolesRepositoryImpl(role_entity_1.default);
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
/** init service */
const rolesServices = new roles_services_impl_1.RoleServicesImpl(rolesRepository);
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
/** init controller */
const rolesController = new roles_1.RolesController(rolesServices);
const authController = new authentications_1.AuthenticationsController(usersServices);
/** init roles routes */
const rolesRoutesSetup = (router) => {
    // protect routes
    router.use(authController.protect);
    // create role router
    router.post('/roles', (0, permission_controller_1.default)(['admin']), rolesController.create);
    // update role router
    router.patch('/roles', (0, permission_controller_1.default)(['admin']), rolesController.update);
    // get all roles
    router.get('/roles', (0, permission_controller_1.default)(['admin']), rolesController.getAll);
    // delete roles
    router.delete('/roles/:id', (0, permission_controller_1.default)(['admin']), rolesController.delete);
};
exports.rolesRoutesSetup = rolesRoutesSetup;
