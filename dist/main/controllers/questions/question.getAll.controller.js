"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllQuestionsController = void 0;
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** Define questions getAll controller */
class GetAllQuestionsController {
    constructor(_questionService) {
        this._questionService = _questionService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: processing get all questions */
            const getAllQuestionsResult = await this.handleGetAllQuestions();
            if (getAllQuestionsResult.isFailure())
                return next(getAllQuestionsResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Get list questions success',
                data: {
                    items: getAllQuestionsResult.data
                }
            });
        });
        /** @todo: processing get all questions */
        this.handleGetAllQuestions = async () => {
            const listQuestions = await this._questionService.getAll();
            return (0, functions_1.success)(listQuestions);
        };
    }
}
exports.GetAllQuestionsController = GetAllQuestionsController;
