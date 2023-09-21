import { NextFunction, Request, Response } from "express";

import { QuestionsServices } from "@src/application/services/questions/questions.services";
import QuestionsEntity from "@src/domain/entities/question.entity";
import catchAsync from "@src/shared/catch-async";
import { Either, success } from "@src/shared/functions";
import AppError from "@src/error-handling/app.error";

/** Define questions getAll controller */
export class GetAllQuestionsController {
    constructor(private _questionService: QuestionsServices<QuestionsEntity>) {}

    /** define execute function */
    execute = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            /** @todo: processing get all questions */
            const getAllQuestionsResult = await this.handleGetAllQuestions();
            if (getAllQuestionsResult.isFailure())
                return next(getAllQuestionsResult.error);

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: "Get list questions success",
                data: {
                    items: getAllQuestionsResult.data,
                },
            });
        }
    );

    /** @todo: processing get all questions */
    private handleGetAllQuestions = async (): Promise<
        Either<QuestionsEntity[], AppError>
    > => {
        const listQuestions = await this._questionService.getAll();
        return success(listQuestions);
    };
}
