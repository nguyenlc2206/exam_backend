"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllRoleController = void 0;
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** Define role getAll controller */
class GetAllRoleController {
    constructor(_roleService) {
        this._roleService = _roleService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: processing get all roles */
            const getAllRolesResult = await this.handleGetAllRoles();
            if (getAllRolesResult.isFailure())
                return next(getAllRolesResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Get list role success',
                data: {
                    items: getAllRolesResult.data
                }
            });
        });
        /** @todo: processing get all roles */
        this.handleGetAllRoles = async () => {
            const listRoles = await this._roleService.getAll();
            return (0, functions_1.success)(listRoles);
        };
    }
}
exports.GetAllRoleController = GetAllRoleController;
