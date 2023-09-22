"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllExamsWithAdminController = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** define getAll exams of user controller */
class GetAllExamsWithAdminController {
    constructor(_examUserService) {
        this._examUserService = _examUserService;
        /** define excute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: get all exams by user id */
            const listExamsResult = await this.handleGetAllExamsByAdmin();
            if (listExamsResult.isFailure())
                return next(listExamsResult.error);
            /** @todo: processing response */
            res.status(200).json({
                status: 'success',
                message: 'Get all exams of user from database success',
                data: {
                    exams: listExamsResult.data
                }
            });
        });
        /** @todo: get all exams by user id */
        this.handleGetAllExamsByAdmin = async () => {
            const listExams = await this._examUserService.getAllExamsByAdmin();
            if (!listExams)
                return (0, functions_1.failure)(new app_error_1.default('Not have exams!', 400));
            return (0, functions_1.success)(listExams);
        };
    }
}
exports.GetAllExamsWithAdminController = GetAllExamsWithAdminController;
