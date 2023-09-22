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
exports.GetAllUsersController = void 0;
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
/** Define role getAll controller */
class GetAllUsersController {
    constructor(_userService) {
        this._userService = _userService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: processing get all users */
            const getAllUsersResult = yield this.handleGetAllUsers();
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
        }));
        /** @todo: processing get all users */
        this.handleGetAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            const listUsers = yield this._userService.getAll();
            return (0, functions_1.success)(listUsers);
        });
    }
}
exports.GetAllUsersController = GetAllUsersController;
