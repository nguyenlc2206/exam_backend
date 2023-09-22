import { ExamRelationUserServices } from '@src/application/services/exam-user/exam.user.services';
import ExamsEntity from '@src/domain/entities/exam.entity';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import AppError from '@src/error-handling/app.error';
import catchAsync from '@src/shared/catch-async';
import { HttpRequestUser } from '@src/shared/entities/http.entity';
import { Either, failure, success } from '@src/shared/functions';
import { NextFunction, Response } from 'express';

/** define getAll exams of user controller */
export class GetAllExamsWithUserIdController {
    constructor(private _examUserService: ExamRelationUserServices<ExamUserEntity>) {}

    /** define excute function */
    execute = catchAsync(async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        /** @todo: get all exams by user id */
        const listExamsResult = await this.handleGetAllExamsByUserId(req.userInfor.userId);
        if (listExamsResult.isFailure()) return next(listExamsResult.error);

        /** @todo: process data to response */
        const resDataProc = await this.handleProcessResponse(listExamsResult.data);
        if (resDataProc.isFailure()) return next(resDataProc.error);

        /** @todo: processing response */
        res.status(200).json({
            status: 'success',
            message: 'Get all exams of user from database success',
            data: {
                exams: resDataProc.data
            }
        });
    });

    /** @todo: get all exams by user id */
    private handleGetAllExamsByUserId = async (id: string): Promise<Either<ExamUserEntity[], AppError>> => {
        const listExams = await this._examUserService.getAllExamsByUserId(id);
        if (!listExams) return failure(new AppError('User not have exam!', 400));
        return success(listExams);
    };

    /** @todo: process data to response */
    private handleProcessResponse = async (data: ExamUserEntity[]): Promise<Either<any, AppError>> => {
        let res: ExamsEntity[] = [];
        Object.values(data).map((item) => {
            res.push(item.exam);
        });
        return success(res);
    };
}
