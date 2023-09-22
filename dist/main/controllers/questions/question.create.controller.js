"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestionController = void 0;
const question_entity_1 = __importDefault(require("~/domain/entities/question.entity"));
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
const validations_1 = require("~/shared/validations");
const requiredFields_1 = require("~/shared/validations/requiredFields");
/** define create question controller */
class CreateQuestionController {
    constructor(_questionService, _examService) {
        this._questionService = _questionService;
        this._examService = _examService;
        /** execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: check id exam exists */
            const checkIdExamResult = await this.handleCheckIdExam(req.body.examId);
            if (checkIdExamResult.isFailure())
                return next(checkIdExamResult.error);
            /** @todo: save data to table questions_entity */
            const saveQuestionsResult = await this.handleCreateQuestions(req.body);
            if (saveQuestionsResult.isFailure())
                return next(saveQuestionsResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: `Insert questions with ${req.body.examId} to database success`,
                data: {
                    questions: saveQuestionsResult.data
                }
            });
        });
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['questions', 'examId'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: check id exam exists */
        this.handleCheckIdExam = async (id) => {
            const exam = await this._examService.getById(id);
            if (!exam)
                return (0, functions_1.failure)(new app_error_1.default('ExamId is not exists in database!', 400));
            return (0, functions_1.success)(exam);
        };
        /** @todo: save data to table questions_entity */
        this.handleCreateQuestions = async (body) => {
            // processing data before save to database
            const _listQuestions = [];
            Object.values(body.questions).map((item) => {
                const question = new question_entity_1.default();
                question.exam = body.examId;
                question.title = item === null || item === void 0 ? void 0 : item.title;
                question.subTitle = item === null || item === void 0 ? void 0 : item.subTitle;
                _listQuestions.push(question);
            });
            const newItems = await this._questionService.create(_listQuestions);
            return (0, functions_1.success)(newItems);
        };
    }
}
exports.CreateQuestionController = CreateQuestionController;
