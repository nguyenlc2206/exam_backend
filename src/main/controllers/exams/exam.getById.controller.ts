import { NextFunction, Request, Response } from 'express'
import { ExamsServices } from 'src/application/services/exams/exam.services'
import ExamsEntity from 'src/domain/entities/exam.entity'
import AppError from 'src/error-handling/app.error'
import catchAsync from 'src/shared/catch-async'
import { Either, failure, success } from 'src/shared/functions'

/** define class get exam by id */
export class GetExamByIdController {
    constructor(private _examService: ExamsServices<ExamsEntity>) {}

    /** define excute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: get exams by id */
        const examResult = await this.handleGetExamById(req.params.id)
        if (examResult.isFailure()) return next(examResult.error)

        /** @todo: processing response */
        res.status(200).json({
            status: 'success',
            message: 'Get exam by id from database success',
            data: {
                exams: examResult.data
            }
        })
    })

    /** @todo: get exams by id */
    private handleGetExamById = async (id: string): Promise<Either<ExamsEntity, AppError>> => {
        const exam = await this._examService.getById(id, true)
        if (!exam) return failure(new AppError('Not have exam!', 400))
        return success(exam)
    }
}
