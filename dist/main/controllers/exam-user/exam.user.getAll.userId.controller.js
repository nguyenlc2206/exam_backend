"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllExamsWithUserIdController = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** define getAll exams of user controller */
class GetAllExamsWithUserIdController {
    constructor(_examUserService) {
        this._examUserService = _examUserService;
        /** define excute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: get all exams by user id */
            const listExamsResult = await this.handleGetAllExamsByUserId(req.userInfor.userId);
            if (listExamsResult.isFailure())
                return next(listExamsResult.error);
            /** @todo: process data to response */
            const resDataProc = await this.handleProcessResponse(listExamsResult.data);
            if (resDataProc.isFailure())
                return next(resDataProc.error);
            /** @todo: processing response */
            res.status(200).json({
                status: 'success',
                message: 'Get all exams of user from database success',
                data: {
                    exams: resDataProc.data
                }
            });
        });
        /** @todo: get all exams by user id */
        this.handleGetAllExamsByUserId = async (id) => {
            const listExams = await this._examUserService.getAllExamsByUserId(id);
            if (!listExams)
                return (0, functions_1.failure)(new app_error_1.default('User not have exam!', 400));
            return (0, functions_1.success)(listExams);
        };
        /** @todo: process data to response */
        this.handleProcessResponse = async (data) => {
            let res = [];
            Object.values(data).map((item) => {
                res.push(item.exam);
            });
            return (0, functions_1.success)(res);
        };
    }
}
exports.GetAllExamsWithUserIdController = GetAllExamsWithUserIdController;
