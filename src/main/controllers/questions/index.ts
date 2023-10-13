import { ExamsServices } from '@src/application/services/exams/exam.services';
import { QuestionsServices } from '@src/application/services/questions/questions.services';
import ExamsEntity from '@src/domain/entities/exam.entity';
import QuestionsEntity from '@src/domain/entities/question.entity';
import { NextFunction, Request, Response } from 'express';
import { CreateQuestionController } from '@src/main/controllers/questions/question.create.controller';
import { DeleteQuestionController } from '@src/main/controllers/questions/question.delete.controller';
import { GetAllQuestionsController } from '@src/main/controllers/questions/question.getAll.controller';
import { GetQuestionsByExamIdController } from './question.getByExamId.controller';
import { UserAnswerServices } from '@src/application/services/user-answer/user.answer.services';
import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';
import { ExamRelationUserServices } from '@src/application/services/exam-user/exam.user.services';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import { RestoreQuestionController } from './question.restore.controller';

/** define questions controller */
export class QuestionsController {
    private examsServices: ExamsServices<ExamsEntity>;
    private questionsServices: QuestionsServices<QuestionsEntity>;
    private userAnswerServices: UserAnswerServices<UserAnswerEntity>;
    private examUserService: ExamRelationUserServices<ExamUserEntity>;

    constructor(
        examsServices: ExamsServices<ExamsEntity>,
        questionsServices: QuestionsServices<QuestionsEntity>,
        userAnswerServices: UserAnswerServices<UserAnswerEntity>,
        examUserService: ExamRelationUserServices<ExamUserEntity>
    ) {
        this.examsServices = examsServices;
        this.questionsServices = questionsServices;
        this.userAnswerServices = userAnswerServices;
        this.examUserService = examUserService;
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

    /** restore method */
    restore = async (req: Request, res: Response, next: NextFunction) => {
        const restoreQuestion = new RestoreQuestionController(this.questionsServices);
        return restoreQuestion.execute(req, res, next);
    };

    /** delete method */
    getQuestionsByExamId = async (req: Request, res: Response, next: NextFunction) => {
        const getQuestions = new GetQuestionsByExamIdController(
            this.questionsServices,
            this.examUserService,
            this.userAnswerServices
        );
        return getQuestions.execute(req, res, next);
    };
}
