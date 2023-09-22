"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsController = void 0;
const question_create_controller_1 = require("./question.create.controller");
const question_delete_controller_1 = require("./question.delete.controller");
const question_getAll_controller_1 = require("./question.getAll.controller");
/** define questions controller */
class QuestionsController {
    constructor(examsServices, questionsServices) {
        /** create method */
        this.create = async (req, res, next) => {
            const createQuestion = new question_create_controller_1.CreateQuestionController(this.questionsServices, this.examsServices);
            return createQuestion.execute(req, res, next);
        };
        /** get all questions */
        this.getAll = async (req, res, next) => {
            const getAllQuestions = new question_getAll_controller_1.GetAllQuestionsController(this.questionsServices);
            return getAllQuestions.execute(req, res, next);
        };
        /** delete method */
        this.delete = async (req, res, next) => {
            const deleteQuestion = new question_delete_controller_1.DeleteQuestionController(this.questionsServices);
            return deleteQuestion.execute(req, res, next);
        };
        this.examsServices = examsServices;
        this.questionsServices = questionsServices;
    }
}
exports.QuestionsController = QuestionsController;
