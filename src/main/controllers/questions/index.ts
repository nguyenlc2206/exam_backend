import { NextFunction, Request, Response } from 'express';

import { CreateQuestionController } from './question.create.controller';
import { DeleteQuestionController } from './question.delete.controller';
import { GetAllQuestionsController } from './question.getAll.controller';
import { ExamsServices } from '../../../application/services/exams/exam.services';
import { QuestionsServices } from '../../../application/services/questions/questions.services';
import ExamsEntity from '../../../domain/entities/exam.entity';
import QuestionsEntity from '../../../domain/entities/question.entity';

/** define questions controller */
export class QuestionsController {
    private examsServices: ExamsServices<ExamsEntity>;
    private questionsServices: QuestionsServices<QuestionsEntity>;

    constructor(examsServices: ExamsServices<ExamsEntity>, questionsServices: QuestionsServices<QuestionsEntity>) {
        this.examsServices = examsServices;
        this.questionsServices = questionsServices;
    }

    /** create method */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createQuestion = new CreateQuestionController(this.questionsServices, this.examsServices);
        return createQuestion.execute(req, res, next);
    };

    /** get all questions */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const getAllQuestions = new GetAllQuestionsController(this.questionsServices);
        return getAllQuestions.execute(req, res, next);
    };

    /** delete method */
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const deleteQuestion = new DeleteQuestionController(this.questionsServices);
        return deleteQuestion.execute(req, res, next);
    };
}
