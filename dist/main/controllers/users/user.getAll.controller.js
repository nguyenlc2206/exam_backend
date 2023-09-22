"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersController = void 0;
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** Define role getAll controller */
class GetAllUsersController {
    constructor(_userService) {
        this._userService = _userService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: processing get all users */
            const getAllUsersResult = await this.handleGetAllUsers();
            if (getAllUsersResult.isFailure())
                return next(getAllUsersResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Get list users success',
                data: {
                    items: getAllUsersResult.data
                }
            });
        });
        /** @todo: processing get all users */
        this.handleGetAllUsers = async () => {
            const listUsers = await this._userService.getAll();
            return (0, functions_1.success)(listUsers);
        };
    }
}
exports.GetAllUsersController = GetAllUsersController;
