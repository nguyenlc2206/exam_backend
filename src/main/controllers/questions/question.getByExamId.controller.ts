import * as _ from 'lodash';
import { NextFunction, Request, Response } from 'express';
import { QuestionsServices } from '@src/application/services/questions/questions.services';
import QuestionsEntity from '@src/domain/entities/question.entity';
import catchAsync from '@src/shared/catch-async';
import { Either, failure, success } from '@src/shared/functions';
import AppError from '@src/error-handling/app.error';
import AnswersEntity from '@src/domain/entities/answer.entity';
import { ExamRelationUserServices } from '@src/application/services/exam-user/exam.user.services';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import { UserAnswerServices } from '@src/application/services/user-answer/user.answer.services';
import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';
import { HttpRequestUser } from '@src/shared/entities/http.entity';

/** define controller getQuestionsByExamId */
export class GetQuestionsByExamIdController {
    constructor(
        private _questionService: QuestionsServices<QuestionsEntity>,
        private _examUserServices: ExamRelationUserServices<ExamUserEntity>,
        private _userAnswerService: UserAnswerServices<UserAnswerEntity>
    ) {}

    /** execute function */
    execute = catchAsync(async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        /** @todo: get questions by exam Id */
        const getResult = await this.handleGetQuestionsByExamId(req.params.examId);
        if (getResult.isFailure()) return next(getResult.error);

        /**  @todo: processing data response */
        const itemsProc = await this.handleQuestionsReponse(getResult.data);
        if (itemsProc.isFailure()) return next(itemsProc.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Get list questions success',
            data: {
                questions: itemsProc.data
            }
        });
    });

    /** @todo: get questions by exam Id */
    private handleGetQuestionsByExamId = async (id: string): Promise<Either<QuestionsEntity[], AppError>> => {
        const listQuestions = await this._questionService.getQuestionsByExamId(id);
        return success(listQuestions);
    };

    /**  @todo: processing data response */
    private handleQuestionsReponse = async (items: QuestionsEntity[]): Promise<Either<QuestionsEntity[], AppError>> => {
        items.map((item: QuestionsEntity) => {
            if (item.answers.length) {
                item.answers.map((answer: AnswersEntity) => {
                    answer.status = false;
                });
            }
        });
        return success(items);
    };
}
