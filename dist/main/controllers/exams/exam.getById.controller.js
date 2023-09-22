"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetExamByIdController = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** define class get exam by id */
class GetExamByIdController {
    constructor(_examService) {
        this._examService = _examService;
        /** define excute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: get exams by id */
            const examResult = await this.handleGetExamById(req.params.id);
            if (examResult.isFailure())
                return next(examResult.error);
            /** @todo: processing response */
            res.status(200).json({
                status: 'success',
                message: 'Get exam by id from database success',
                data: {
                    exams: examResult.data
                }
            });
        });
        /** @todo: get exams by id */
        this.handleGetExamById = async (id) => {
            const exam = await this._examService.getById(id, true);
            if (!exam)
                return (0, functions_1.failure)(new app_error_1.default('Not have exam!', 400));
            return (0, functions_1.success)(exam);
        };
    }
}
exports.GetExamByIdController = GetExamByIdController;
