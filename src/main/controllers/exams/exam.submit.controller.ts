import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';

import catchAsync from '@src/shared/catch-async';
import QuestionsEntity from '@src/domain/entities/question.entity';
import { Either, failure, success } from '@src/shared/functions';
import AppError from '@src/error-handling/app.error';
import { ExamsServices } from '@src/application/services/exams/exam.services';
import ExamsEntity from '@src/domain/entities/exam.entity';

/** define type and value resulte submit */
type ItemResult = {
    questionId: string | undefined;
    answserId: string | undefined;
};
type ResultType = {
    numbCorrect: number;
    questionsCorrect: ItemResult[];
    questionsWrong: ItemResult[];
};

/** define submit exam controller */
export class SubmitExamController {
    constructor(private _examsServices: ExamsServices<ExamsEntity>) {}

    /** execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: get questions by exam Id */
        const getResult = await this.handleGetQuestionsByExamId(req.body?.examId);
        if (getResult.isFailure()) return next(getResult.error);
        const { data: questions } = getResult;

        /** @todo: process checking questions submit */
        const resultRes = await this.handleProcQuestionSubmit(req, questions);
        if (resultRes.isFailure()) return next(resultRes.error);

        /** @todo: processing response */
        res.status(200).json({
            status: 'success',
            message: '',
            data: {
                data: resultRes.data
            }
        });
    });

    /** @todo: get questions by exam Id */
    private handleGetQuestionsByExamId = async (id: string): Promise<Either<QuestionsEntity[], AppError>> => {
        const exams = await this._examsServices.getById(id, true);
        if (!exams) return failure(new AppError('Exam Id is not exists in database!', 400));
        // console.log('>>>Check exams:', exams);
        return success(exams?.questions);
    };

    /** @todo: process checking questions submit */
    private handleProcQuestionSubmit = async (
        req: Request,
        questions: QuestionsEntity[]
    ): Promise<Either<ResultType, AppError>> => {
        let result: ResultType = {
            numbCorrect: 0,
            questionsCorrect: [],
            questionsWrong: []
        };

        const questionSubmit = req.body?.data;
        // console.log('>>>Check questions:', questions);

        questionSubmit.map((item: any) => {
            const questionFinded = _.find(questions, { id: item?.questionId });
            // console.log('>>>Check questionFinded:', questionFinded);

            if (questionFinded?.answerCorrectId === item?.answerId) {
                result.numbCorrect = result.numbCorrect + 1;
                result.questionsCorrect.push({
                    questionId: questionFinded?.id,
                    answserId: questionFinded?.answerCorrectId
                });
            } else {
                result.questionsWrong.push({
                    questionId: questionFinded?.id,
                    answserId: questionFinded?.answerCorrectId
                });
            }
        });

        return success(result);
    };
}
