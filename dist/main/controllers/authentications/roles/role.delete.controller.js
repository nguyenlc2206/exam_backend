"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRoleController = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** Define role delete controller */
class DeleteRoleController {
    constructor(_roleServices) {
        this._roleServices = _roleServices;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: check id is exists in database */
            const checkIdError = await this.handleCheckIdExists(req.params.id);
            if (checkIdError.isFailure())
                return next(checkIdError.error);
            /** @todo: processing delete */
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Delete role is success',
                data: {}
            });
        });
        /** @todo: check id is exists in database */
        this.handleCheckIdExists = async (id) => {
            const itemGetById = await this._roleServices.getById(id);
            if (!itemGetById)
                return (0, functions_1.failure)(new app_error_1.default('Id is not exists!', 400));
            return (0, functions_1.success)(itemGetById);
        };
    }
}
exports.DeleteRoleController = DeleteRoleController;
