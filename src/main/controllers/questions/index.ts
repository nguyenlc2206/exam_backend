import { ExamsServices } from '@src/application/services/exams/exam.services';
import { QuestionsServices } from '@src/application/services/questions/questions.services';
import ExamsEntity from '@src/domain/entities/exam.entity';
import QuestionsEntity from '@src/domain/entities/question.entity';
import { NextFunction, Request, Response } from 'express';
import { CreateQuestionController } from '@src/main/controllers/questions/question.create.controller';
import { DeleteQuestionController } from '@src/main/controllers/questions/question.delete.controller';
import { GetAllQuestionsController } from '@src/main/controllers/questions/question.getAll.controller';

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
