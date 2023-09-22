"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersController = void 0;
const answer_create_controller_1 = require("./answer.create.controller");
const answer_delete_controller_1 = require("./answer.delete.controller");
/** define answers controller */
class AnswersController {
    constructor(answersServices, questionsServices) {
        /** create method */
        this.create = async (req, res, next) => {
            const createAnswer = new answer_create_controller_1.CreateAnwserController(this.questionsServices, this.answersServices);
            return createAnswer.execute(req, res, next);
        };
        /** delete method */
        this.delete = async (req, res, next) => {
            const deleteAnswer = new answer_delete_controller_1.DeleteAnswerController(this.answersServices);
            return deleteAnswer.execute(req, res, next);
        };
        this.answersServices = answersServices;
        this.questionsServices = questionsServices;
    }
}
exports.AnswersController = AnswersController;
