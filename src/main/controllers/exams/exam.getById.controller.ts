import * as _ from 'lodash';
import { ExamRelationUserServices } from '@src/application/services/exam-user/exam.user.services';
import { ExamsServices } from '@src/application/services/exams/exam.services';
import { UserAnswerServices } from '@src/application/services/user-answer/user.answer.services';
import ExamsEntity from '@src/domain/entities/exam.entity';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import QuestionsEntity from '@src/domain/entities/question.entity';
import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';
import AppError from '@src/error-handling/app.error';
import catchAsync from '@src/shared/catch-async';
import { HttpRequestUser } from '@src/shared/entities/http.entity';
import { Either, failure, success } from '@src/shared/functions';
import { NextFunction, Response } from 'express';

/** define class get exam by id */
export class GetExamByIdController {
    constructor(
        private _examService: ExamsServices<ExamsEntity>,
        private _examUserServices: ExamRelationUserServices<ExamUserEntity>,
        private _userAnswerService: UserAnswerServices<UserAnswerEntity>
    ) {}

    /** define excute function */
    execute = catchAsync(async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        /** @todo: get status exam of user */
        // console.log('>>>Check exam id:', req.params?.examId);
        const resCheckStatus = await this.handleGetStatusExam(req.userInfor?.userId, req.params?.examId);
        if (resCheckStatus.isFailure()) return next(resCheckStatus.error);

        // console.log('>>>Check resCheckStatus:', resCheckStatus.data[0]);

        /** check status and count number retry exams */
        if (resCheckStatus.data[0]?.status && resCheckStatus.data[0]?.retry === 0) {
            /** @todo: handle get data from user anwser */
            const resUserAnswer = await this.handleGetDataUserAnwser(
                req.userInfor?.userId,
                req.params?.examId,
                resCheckStatus.data[0]?.retry
            );
            if (resUserAnswer.isFailure()) return next(resUserAnswer.error);

            const _questions: any[] = [];
            resUserAnswer.data.map((item: UserAnswerEntity) => {
                _questions.push({
                    ...item?.question,
                    answerCorrectId: item?.answerCorrectId,
                    answerUserId: item?.answerUserId
                });
            });

            const dataExam = { ...resUserAnswer.data[0].exam, questions: _questions };
            const exams = _.omit(dataExam, ['user', 'category', 'examUser', 'userAnswer']);

            /** @todo: processing response */
            return res.status(200).json({
                status: 'success',
                message: '',
                data: {
                    exams: exams
                }
            });
        }

        /** @todo: get exams by id */
        const examResult = await this.handleGetExamById(req.params.examId);
        if (examResult.isFailure()) return next(examResult.error);

        // console.log('>>>Check examResult:', examResult.data);

        /** @todo: processing response */
        res.status(200).json({
            status: 'success',
            message: 'Get exam by id from database success',
            data: {
                exams: examResult.data
            }
        });
    });

    /** @todo: get status exam of user */
    private handleGetStatusExam = async (
        userId: string,
        examId: string
    ): Promise<Either<ExamUserEntity[], AppError>> => {
        const res = await this._examUserServices.getByUserIdAndExamId(userId, examId);
        if (!res.length) return failure(new AppError('Not have exam with user', 400));
        return success(res);
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

    /** @todo: get exams by id */
    private handleGetExamById = async (id: string): Promise<Either<ExamsEntity, AppError>> => {
        const exam = await this._examService.getById(id);
        if (!exam) return failure(new AppError('Not have exam!', 400));
        if (exam?.status === false) {
            return success(exam);
        }
        exam.questions.map((item: QuestionsEntity) => {
            item.answerCorrectId = '';
        });
        return success(exam);
    };
}
