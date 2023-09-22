import { NextFunction, Request, Response } from 'express';
import { QuestionsServices } from '~/application/services/questions/questions.services';
import QuestionsEntity from '~/domain/entities/question.entity';
import AppError from '~/error-handling/app.error';
import catchAsync from '~/shared/catch-async';
import { Either, success } from '~/shared/functions';

/** Define questions getAll controller */
export class GetAllQuestionsController {
    constructor(private _questionService: QuestionsServices<QuestionsEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: processing get all questions */
        const getAllQuestionsResult = await this.handleGetAllQuestions();
        if (getAllQuestionsResult.isFailure()) return next(getAllQuestionsResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Get list questions success',
            data: {
                items: getAllQuestionsResult.data
            }
        });
    });

    /** @todo: processing get all questions */
    private handleGetAllQuestions = async (): Promise<Either<QuestionsEntity[], AppError>> => {
        const listQuestions = await this._questionService.getAll();
        return success(listQuestions);
    };
}
