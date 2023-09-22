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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsController = void 0;
const question_create_controller_1 = require("./question.create.controller");
const question_delete_controller_1 = require("./question.delete.controller");
const question_getAll_controller_1 = require("./question.getAll.controller");
/** define questions controller */
class QuestionsController {
    constructor(examsServices, questionsServices) {
        /** create method */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const createQuestion = new question_create_controller_1.CreateQuestionController(this.questionsServices, this.examsServices);
            return createQuestion.execute(req, res, next);
        });
        /** get all questions */
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getAllQuestions = new question_getAll_controller_1.GetAllQuestionsController(this.questionsServices);
            return getAllQuestions.execute(req, res, next);
        });
        /** delete method */
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const deleteQuestion = new question_delete_controller_1.DeleteQuestionController(this.questionsServices);
            return deleteQuestion.execute(req, res, next);
        });
        this.examsServices = examsServices;
        this.questionsServices = questionsServices;
    }
}
exports.QuestionsController = QuestionsController;
