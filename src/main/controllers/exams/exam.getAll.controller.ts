import { ExamsServices } from "@src/application/services/exams/exam.services";
import ExamsEntity from "@src/domain/entities/exam.entity";
import AppError from "@src/error-handling/app.error";
import catchAsync from "@src/shared/catch-async";
import { Either, success } from "@src/shared/functions";
import { NextFunction, Request, Response } from "express";

/** define class getAll Exam controller */
export class GetAllExamsController {
    constructor(private _examsServices: ExamsServices<ExamsEntity>) {}

    /** define execute function */
    execute = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            /** @todo: getAll exams */
            const listExamsResult = await this.handleGetAllExams();
            if (listExamsResult.isFailure()) return next(listExamsResult.error);

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: "Get list exams success",
                data: {
                    items: listExamsResult.data,
                },
            });
        }
    );

    /** @todo: getAll exams */
    private handleGetAllExams = async (): Promise<
        Either<ExamsEntity[], AppError>
    > => {
        const listAllCategories = await this._examsServices.getAll();
        return success(listAllCategories);
    };
}
