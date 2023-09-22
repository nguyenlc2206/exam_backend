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
exports.RolesController = void 0;
const role_create_controller_1 = require("./role.create.controller");
const role_update_controller_1 = require("./role.update.controller");
const role_getAll_controller_1 = require("./role.getAll.controller");
const role_delete_controller_1 = require("./role.delete.controller");
/** Define make create role controller */
class RolesController {
    constructor(service) {
        /** create role */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const createRole = new role_create_controller_1.CreateRoleController(this.service);
            return createRole.execute(req, res, next);
        });
        /** update role */
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const updateRole = new role_update_controller_1.UpdateRoleController(this.service);
            return updateRole.execute(req, res, next);
        });
        /** get all roles */
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const listRoles = new role_getAll_controller_1.GetAllRoleController(this.service);
            return listRoles.execute(req, res, next);
        });
        /** delete roles */
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const deleteRole = new role_delete_controller_1.DeleteRoleController(this.service);
            return deleteRole.execute(req, res, next);
        });
        this.service = service;
    }
}
exports.RolesController = RolesController;
