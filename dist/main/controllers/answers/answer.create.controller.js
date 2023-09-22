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
exports.CreateAnwserController = void 0;
const answer_entity_1 = __importDefault(require("../../../domain/entities/answer.entity"));
const question_entity_1 = __importDefault(require("../../../domain/entities/question.entity"));
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
/** define create anwsers controller */
class CreateAnwserController {
    constructor(_questionService, _answerService) {
        this._questionService = _questionService;
        this._answerService = _answerService;
        /** execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: validation field */
            //
            /** @todo: get all list id questions in database */
            const listIds = yield this.handleGetAllQuestionsId();
            if (listIds.isFailure())
                return next(listIds.error);
            /** @todo: check list id question of body */
            const checkListIdResult = this.handleCheckListIds(req, listIds.data);
            if (checkListIdResult.isFailure())
                return next(checkListIdResult.error);
            /** @todo: check and remove answers */
            /** @todo: save data to table answers_entity */
            const saveAnswersResult = yield this.handleCreateAnswers(req);
            if (saveAnswersResult.isFailure())
                return next(saveAnswersResult.error);
            /** @todo: save data correct questions_entity */
            const saveAnswersCorrectResult = yield this.handleUpdateAnswerCorrect(saveAnswersResult.data);
            if (saveAnswersCorrectResult.isFailure())
                return next(saveAnswersCorrectResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: '',
                data: {
                    answers: saveAnswersResult.data
                }
            });
        }));
        /** @todo: validation field */
        this.handleValidation = (request) => { };
        /** @todo: get all list id questions in database */
        this.handleGetAllQuestionsId = () => __awaiter(this, void 0, void 0, function* () {
            const questions = yield this._questionService.getAll();
            const questionssId = [];
            Object.values(questions).map((item) => {
                questionssId.push(item.id);
            });
            return (0, functions_1.success)(questionssId);
        });
        /** @todo: check list id question of body */
        this.handleCheckListIds = (req, listIds) => {
            /** @todo: get all list id questions in data input */
            const listIdsData = [];
            Object.values(req.body.data).map((item) => {
                listIdsData.push(item.questionId);
            });
            /** @todo: compare 2 list ids*/
            const hasAllElems = listIdsData.every((elem) => listIds.includes(elem));
            if (!hasAllElems)
                return (0, functions_1.failure)(new app_error_1.default('Something wrong list questions ids!', 400));
            return (0, functions_1.success)(true);
        };
        /** @todo: get all answers by question id */
        this.handleGetAnswersByQuestionId = (id) => __awaiter(this, void 0, void 0, function* () {
            const answers = yield this._answerService.getByQuestionId(id);
            return (0, functions_1.success)(answers);
        });
        /** @todo: delete answers exists */
        this.handleDeleteAnswers = (item) => __awaiter(this, void 0, void 0, function* () {
            yield this._answerService.remove(item);
        });
        /** @todo: save data to table answers_entity */
        this.handleCreateAnswers = (req) => __awaiter(this, void 0, void 0, function* () {
            // processing data save to answer database
            const _listAnswers = [];
            Object.values(req.body.data).map((question) => __awaiter(this, void 0, void 0, function* () {
                Object.values(question.answers).map((answer) => {
                    const _answer = new answer_entity_1.default();
                    _answer.question = question === null || question === void 0 ? void 0 : question.questionId;
                    _answer.title = answer === null || answer === void 0 ? void 0 : answer.title;
                    _answer.status = answer === null || answer === void 0 ? void 0 : answer.select;
                    _listAnswers.push(_answer);
                });
                /** @todo: get all answers by question id */
                const listAnswersExists = yield this.handleGetAnswersByQuestionId(question === null || question === void 0 ? void 0 : question.questionId);
                if (listAnswersExists.isFailure())
                    return (0, functions_1.failure)(listAnswersExists.error);
                /** @todo: delete answers exists */
                if (listAnswersExists.data.length)
                    yield this.handleDeleteAnswers(listAnswersExists.data);
                return;
            }));
            const newItem = yield this._answerService.create(_listAnswers);
            return (0, functions_1.success)(newItem);
        });
        /** @todo: save data correct questions_entity */
        this.handleUpdateAnswerCorrect = (items) => __awaiter(this, void 0, void 0, function* () {
            const _listQuestions = [];
            Object.values(items).map((ele) => __awaiter(this, void 0, void 0, function* () {
                if ((ele === null || ele === void 0 ? void 0 : ele.status) === true) {
                    const question = new question_entity_1.default();
                    question.id = ele === null || ele === void 0 ? void 0 : ele.question;
                    question.answerCorrectId = ele === null || ele === void 0 ? void 0 : ele.id;
                    const newItem = yield this._questionService.update(question);
                    _listQuestions.push(newItem);
                }
            }));
            return (0, functions_1.success)(_listQuestions);
        });
    }
}
exports.CreateAnwserController = CreateAnwserController;
