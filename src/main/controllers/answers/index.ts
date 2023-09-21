import { AnswersServices } from "@src/application/services/answers/answers.services";
import { QuestionsServices } from "@src/application/services/questions/questions.services";
import AnswersEntity from "@src/domain/entities/answer.entity";
import QuestionsEntity from "@src/domain/entities/question.entity";
import { NextFunction, Request, Response } from "express";
import { CreateAnwserController } from "./answer.create.controller";
import { DeleteAnswerController } from "./answer.delete.controller";

/** define answers controller */
export class AnswersController {
    private questionsServices: QuestionsServices<QuestionsEntity>;
    private answersServices: AnswersServices<AnswersEntity>;

    constructor(
        answersServices: AnswersServices<AnswersEntity>,
        questionsServices: QuestionsServices<QuestionsEntity>
    ) {
        this.answersServices = answersServices;
        this.questionsServices = questionsServices;
    }

    /** create method */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createAnswer = new CreateAnwserController(
            this.questionsServices,
            this.answersServices
        );
        return createAnswer.execute(req, res, next);
    };

    /** delete method */
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const deleteAnswer = new DeleteAnswerController(this.answersServices);
        return deleteAnswer.execute(req, res, next);
    };
}
