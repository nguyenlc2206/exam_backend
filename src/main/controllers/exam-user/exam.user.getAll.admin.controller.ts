import { NextFunction, Response } from 'express';
import { ExamRelationUserServices } from '../../../application/services/exam-user/exam.user.services';
import ExamUserEntity from '../../../domain/entities/examUser.entity';
import AppError from '../../../error-handling/app.error';
import catchAsync from '../../../shared/catch-async';
import { HttpRequestUser } from '../../../shared/entities/http.entity';
import { Either, failure, success } from '../../../shared/functions';

/** define getAll exams of user controller */
export class GetAllExamsWithAdminController {
    constructor(private _examUserService: ExamRelationUserServices<ExamUserEntity>) {}

    /** define excute function */
    execute = catchAsync(async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        /** @todo: get all exams by user id */
        const listExamsResult = await this.handleGetAllExamsByAdmin();
        if (listExamsResult.isFailure()) return next(listExamsResult.error);

        /** @todo: processing response */
        res.status(200).json({
            status: 'success',
            message: 'Get all exams of user from database success',
            data: {
                exams: listExamsResult.data
            }
        });
    });

    /** @todo: get all exams by user id */
    private handleGetAllExamsByAdmin = async (): Promise<Either<ExamUserEntity[], AppError>> => {
        const listExams = await this._examUserService.getAllExamsByAdmin();
        if (!listExams) return failure(new AppError('Not have exams!', 400));
        return success(listExams);
    };
}
