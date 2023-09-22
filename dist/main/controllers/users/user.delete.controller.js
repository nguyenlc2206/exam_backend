"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** define delete user controller */
class DeleteUserController {
    constructor(_userServices) {
        this._userServices = _userServices;
        /** execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: check id is exists in database */
            const checkIdError = await this.handleCheckIdExists(req.params.id);
            if (checkIdError.isFailure())
                return next(checkIdError.error);
            /** @todo: processing delete */
            const deleteUserResult = await this.handleDeleteUser(req.params.id);
            if (deleteUserResult.isFailure())
                return next(deleteUserResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Delete user is success',
                data: {}
            });
        });
        /** @todo: check id is exists in database */
        this.handleCheckIdExists = async (id) => {
            const itemGetById = await this._userServices.getUserById(id);
            if (!itemGetById)
                return (0, functions_1.failure)(new app_error_1.default('User id is not exists!', 400));
            return (0, functions_1.success)(itemGetById);
        };
        /** @todo: processing delete */
        this.handleDeleteUser = async (id) => {
            await this._userServices.delete(id);
            return (0, functions_1.success)(true);
        };
    }
}
exports.DeleteUserController = DeleteUserController;
