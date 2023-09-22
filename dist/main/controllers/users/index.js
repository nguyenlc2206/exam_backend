"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_create_controller_1 = require("./user.create.controller");
const user_delete_controller_1 = require("./user.delete.controller");
const user_getAll_controller_1 = require("./user.getAll.controller");
/** Define users controller */
class UsersController {
    constructor(service) {
        /** create user */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const createUser = new user_create_controller_1.CreateUserController(this.service);
            return createUser.execute(req, res, next);
        });
        /** get all users */
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getAllUsers = new user_getAll_controller_1.GetAllUsersController(this.service);
            return getAllUsers.execute(req, res, next);
        });
        /** delete user */
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const deleteUser = new user_delete_controller_1.DeleteUserController(this.service);
            return deleteUser.execute(req, res, next);
        });
        this.service = service;
    }
}
exports.UsersController = UsersController;
