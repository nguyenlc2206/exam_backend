import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';

import catchAsync from '@src/shared/catch-async';
import QuestionsEntity from '@src/domain/entities/question.entity';
import { Either, failure, success } from '@src/shared/functions';
import AppError from '@src/error-handling/app.error';
import { ExamsServices } from '@src/application/services/exams/exam.services';
import ExamsEntity from '@src/domain/entities/exam.entity';
import { UserAnswerServices } from '@src/application/services/user-answer/user.answer.services';
import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';
import { HttpRequestUser } from '@src/shared/entities/http.entity';
import { ExamRelationUserServices } from '@src/application/services/exam-user/exam.user.services';
import ExamUserEntity from '@src/domain/entities/examUser.entity';

/** define type and value resulte submit */
type ItemResult = {
    questionId: string;
    answserCorrectId: string;
    userAnswerId: string;
};
type ResultType = {
    numbCorrect: number;
    questions: ItemResult[];
};

/** define submit exam controller */
export class SubmitExamController {
    constructor(
        private _examsServices: ExamsServices<ExamsEntity>,
        private _examUserServices: ExamRelationUserServices<ExamUserEntity>,
        private _userAnswerService: UserAnswerServices<UserAnswerEntity>
    ) {}

    /** execute function */
    execute = catchAsync(async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        /** @todo: get questions by exam Id */
        const getResult = await this.handleGetQuestionsByExamId(req.body?.examId);
        if (getResult.isFailure()) return next(getResult.error);
        const { data: questions } = getResult;
        console.log('>>>Check questions', questions);

        /** @todo: get status exam of user */
        const resCheckStatus = await this.handleGetStatusExam(req.userInfor?.userId, req.body?.examId);
        if (resCheckStatus.isFailure()) return next(resCheckStatus.error);

        if (resCheckStatus.data[0]?.status && resCheckStatus.data[0]?.retry === 0) {
            /** @todo: handle get data from user anwser */
            const resUserAnswer = await this.handleGetDataUserAnwser(
                req.userInfor?.userId,
                req.body?.examId,
                resCheckStatus.data[0]?.retry
            );
            if (resUserAnswer.isFailure()) return next(resUserAnswer.error);

            /** @todo: processing response */
            return res.status(200).json({
                status: 'success',
                message: '',
                data: {
                    data: resUserAnswer.data
                }
            });
        }

        /** @todo: process checking questions submit */
        const resultRes = await this.handleProcQuestionSubmit(req, questions);
        if (resultRes.isFailure()) return next(resultRes.error);

        /** @todo: handle update to useranswer database */
        console.log('>>>Check resultRes.data.questions:', resultRes.data.questions);
        console.log('>>>Check resCheckStatus.data[0]:', resCheckStatus.data[0]);

        const resSave = await this.handleSavetoUserAnswer(req, resultRes.data.questions, resCheckStatus.data[0]);
        if (resSave.isFailure()) return next(resSave.error);
        // console.log('>>>Check resSave:', resSave);

        /** @todo: handle update to status exam of user */
        if (resCheckStatus.data[0]?.retry === 0) await this.handleUpdateStatusExamUser(resCheckStatus.data[0]);
        else await this.handleUpdateRetryExamUser(resCheckStatus.data[0]);

        /** @todo: processing response */
        res.status(200).json({
            status: 'success',
            message: 'Submit exam success',
            data: {
                data: resSave.data,
                numberCorrect: resultRes.data.numbCorrect
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

    /** @todo: get status exam of user */
    private handleGetStatusExam = async (
        userId: string,
        examId: string
    ): Promise<Either<ExamUserEntity[], AppError>> => {
        const res = await this._examUserServices.getByUserIdAndExamId(userId, examId);
        if (!res.length) return failure(new AppError('Not have exam with user', 400));
        return success(res);
    };

    /** @todo: process checking questions submit */
    private handleProcQuestionSubmit = async (
        req: Request,
        questions: QuestionsEntity[]
    ): Promise<Either<ResultType, AppError>> => {
        let result: ResultType = {
            numbCorrect: 0,
            questions: []
        };

        const questionSubmit = req.body?.data;

        questionSubmit.map((item: any) => {
            const questionFinded = _.find(questions, { id: item?.questionId });
            if (questionFinded?.answerCorrectId === item?.answerId) {
                result.numbCorrect = result.numbCorrect + 1;
            }

            result.questions.push({
                questionId: questionFinded?.id as string,
                answserCorrectId: questionFinded?.answerCorrectId as string,
                userAnswerId: item?.answerId as string
            });
        });
        return success(result);
    };

    /** @todo: handle update to useranswer database */
    private handleSavetoUserAnswer = async (
        req: HttpRequestUser,
        data: ItemResult[],
        examUser: ExamUserEntity
    ): Promise<Either<UserAnswerEntity[], AppError>> => {
        /** */
        const dataProc: UserAnswerEntity[] = [];

        data.map((item: ItemResult) => {
            const _item = new UserAnswerEntity();
            _item.answerUserId = item.userAnswerId;
            _item.answerCorrectId = item.answserCorrectId;
            _item.question = item.questionId as any;
            _item.status = item.answserCorrectId === item.userAnswerId;
            _item.exam = req.body?.examId;
            _item.user = req.userInfor?.userId;
            _item.retryId = examUser.retry;
            dataProc.push(_item);
        });

        const res = await this._userAnswerService.create(dataProc);

        /** update status exeam of user */
        return success(res);
    };

    /** @todo: handle update to status exam of user */
    private handleUpdateStatusExamUser = async (item: ExamUserEntity): Promise<void> => {
        const data = new ExamUserEntity();
        data.id = item.id;
        data.status = true;
        await this._examUserServices.update(data);
    };

    /** @todo: handle update to retry exam of user */
    private handleUpdateRetryExamUser = async (item: ExamUserEntity): Promise<void> => {
        const data = new ExamUserEntity();
        data.id = item.id;
        data.retry = item.retry - 1;
        await this._examUserServices.update(data);
    };

    /** @todo: handle get data from user anwser */
    private handleGetDataUserAnwser = async (
        userId: string,
        examId: string,
        retry: number
    ): Promise<Either<UserAnswerEntity[], AppError>> => {
        const res = await this._userAnswerService.getByUserIdAndExamId(userId, examId, retry);
        if (!res.length) return failure(new AppError('Not have exam with user', 400));
        return success(res);
    };
}
