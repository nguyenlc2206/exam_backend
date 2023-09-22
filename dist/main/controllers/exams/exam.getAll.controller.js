"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllExamsController = void 0;
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** define class getAll Exam controller */
class GetAllExamsController {
    constructor(_examsServices) {
        this._examsServices = _examsServices;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: getAll exams */
            const listExamsResult = await this.handleGetAllExams();
            if (listExamsResult.isFailure())
                return next(listExamsResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Get list exams success',
                data: {
                    items: listExamsResult.data
                }
            });
        });
        /** @todo: getAll exams */
        this.handleGetAllExams = async () => {
            const listAllCategories = await this._examsServices.getAll();
            return (0, functions_1.success)(listAllCategories);
        };
    }
}
exports.GetAllExamsController = GetAllExamsController;
