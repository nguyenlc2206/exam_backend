"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsRoutesSetup = void 0;
const authentications_1 = require("../controllers/authentications");
const groups_1 = require("../controllers/authentications/groups");
const permission_controller_1 = __importDefault(require("../controllers/authentications/permission.controller"));
const groups_services_impl_1 = require("../../application/services/groups/groups.services.impl");
const users_services_impl_1 = require("../../application/services/users/users.services.impl");
const group_entity_1 = __importDefault(require("../../domain/entities/group.entity"));
const user_entity_1 = __importDefault(require("../../domain/entities/user.entity"));
const groups_repository_impl_1 = require("../../infrastructure/repositories/groups.repository.impl");
const users_repository_impl_1 = require("../../infrastructure/repositories/users.repository.impl");
/** init repository */
const groupsRepository = new groups_repository_impl_1.GroupsRepositoryImpl(group_entity_1.default);
const usersRepository = new users_repository_impl_1.UsersRepositoryImpl(user_entity_1.default);
/** init service */
const groupsServices = new groups_services_impl_1.GroupsServicesImpl(groupsRepository);
const usersServices = new users_services_impl_1.UsersServicesImpl(usersRepository);
/** init controller */
const groupsController = new groups_1.GroupsController(groupsServices);
const authController = new authentications_1.AuthenticationsController(usersServices);
/** init groups routes */
const groupsRoutesSetup = (router) => {
    // protect routes
    router.use(authController.protect);
    // create group router
    router.post('/groups', (0, permission_controller_1.default)(['admin']), groupsController.create);
    // update group router
    router.patch('/groups', (0, permission_controller_1.default)(['admin']), groupsController.update);
    // getAll groups router
    router.get('/groups', (0, permission_controller_1.default)(['admin']), groupsController.getAll);
};
exports.groupsRoutesSetup = groupsRoutesSetup;
