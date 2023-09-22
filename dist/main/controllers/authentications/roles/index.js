"use strict";
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
        this.create = async (req, res, next) => {
            const createRole = new role_create_controller_1.CreateRoleController(this.service);
            return createRole.execute(req, res, next);
        };
        /** update role */
        this.update = async (req, res, next) => {
            const updateRole = new role_update_controller_1.UpdateRoleController(this.service);
            return updateRole.execute(req, res, next);
        };
        /** get all roles */
        this.getAll = async (req, res, next) => {
            const listRoles = new role_getAll_controller_1.GetAllRoleController(this.service);
            return listRoles.execute(req, res, next);
        };
        /** delete roles */
        this.delete = async (req, res, next) => {
            const deleteRole = new role_delete_controller_1.DeleteRoleController(this.service);
            return deleteRole.execute(req, res, next);
        };
        this.service = service;
    }
}
exports.RolesController = RolesController;
