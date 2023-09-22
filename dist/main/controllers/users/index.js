"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_create_controller_1 = require("./user.create.controller");
const user_delete_controller_1 = require("./user.delete.controller");
const user_getAll_controller_1 = require("./user.getAll.controller");
/** Define users controller */
class UsersController {
    constructor(service) {
        /** create user */
        this.create = async (req, res, next) => {
            const createUser = new user_create_controller_1.CreateUserController(this.service);
            return createUser.execute(req, res, next);
        };
        /** get all users */
        this.getAll = async (req, res, next) => {
            const getAllUsers = new user_getAll_controller_1.GetAllUsersController(this.service);
            return getAllUsers.execute(req, res, next);
        };
        /** delete user */
        this.delete = async (req, res, next) => {
            const deleteUser = new user_delete_controller_1.DeleteUserController(this.service);
            return deleteUser.execute(req, res, next);
        };
        this.service = service;
    }
}
exports.UsersController = UsersController;
