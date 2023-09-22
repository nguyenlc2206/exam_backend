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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllRoleController = void 0;
const catch_async_1 = __importDefault(require("../../../../shared/catch-async"));
const functions_1 = require("../../../../shared/functions");
/** Define role getAll controller */
class GetAllRoleController {
    constructor(_roleService) {
        this._roleService = _roleService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: processing get all roles */
            const getAllRolesResult = yield this.handleGetAllRoles();
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
        }));
        /** @todo: processing get all roles */
        this.handleGetAllRoles = () => __awaiter(this, void 0, void 0, function* () {
            const listRoles = yield this._roleService.getAll();
            return (0, functions_1.success)(listRoles);
        });
    }
}
exports.GetAllRoleController = GetAllRoleController;
