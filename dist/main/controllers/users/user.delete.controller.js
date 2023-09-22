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
exports.DeleteUserController = void 0;
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
/** define delete user controller */
class DeleteUserController {
    constructor(_userServices) {
        this._userServices = _userServices;
        /** execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: check id is exists in database */
            const checkIdError = yield this.handleCheckIdExists(req.params.id);
            if (checkIdError.isFailure())
                return next(checkIdError.error);
            /** @todo: processing delete */
            const deleteUserResult = yield this.handleDeleteUser(req.params.id);
            if (deleteUserResult.isFailure())
                return next(deleteUserResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Delete user is success',
                data: {}
            });
        }));
        /** @todo: check id is exists in database */
        this.handleCheckIdExists = (id) => __awaiter(this, void 0, void 0, function* () {
            const itemGetById = yield this._userServices.getUserById(id);
            if (!itemGetById)
                return (0, functions_1.failure)(new app_error_1.default('User id is not exists!', 400));
            return (0, functions_1.success)(itemGetById);
        });
        /** @todo: processing delete */
        this.handleDeleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
            yield this._userServices.delete(id);
            return (0, functions_1.success)(true);
        });
    }
}
exports.DeleteUserController = DeleteUserController;
