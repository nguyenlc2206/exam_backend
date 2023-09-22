"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllGroupsController = void 0;
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** Define getAll Groups Controller */
class GetAllGroupsController {
    constructor(_groupsServices) {
        this._groupsServices = _groupsServices;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: processing get all groups */
            const getAllGroupsResult = await this.handleGetAllGroups();
            if (getAllGroupsResult.isFailure())
                return next(getAllGroupsResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Get list groups success',
                data: {
                    items: getAllGroupsResult.data
                }
            });
        });
        /** @todo: processing get all groups */
        this.handleGetAllGroups = async () => {
            const listRoles = await this._groupsServices.getAll();
            return (0, functions_1.success)(listRoles);
        };
    }
}
exports.GetAllGroupsController = GetAllGroupsController;
