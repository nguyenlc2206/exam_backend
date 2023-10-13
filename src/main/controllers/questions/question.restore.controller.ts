import { QuestionsServices } from '@src/application/services/questions/questions.services';
import QuestionsEntity from '@src/domain/entities/question.entity';
import AppError from '@src/error-handling/app.error';
import catchAsync from '@src/shared/catch-async';
import { Either, failure, success } from '@src/shared/functions';
import { NextFunction, Request, Response } from 'express';

/** define class restore controller */
export class RestoreQuestionController {
    constructor(private _questionService: QuestionsServices<QuestionsEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: get question with id */
        const resResultCheck = await this.handleGetQuestionById(req.params.id);
        if (resResultCheck.isFailure()) return next(resResultCheck.error);

        /** @todo: restore question */
        const resRestore = await this.handleRestoreQuestion(req.params.id);
        if (resRestore.isFailure()) return next(resRestore.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Restore questions success',
            data: {}
        });
    });

    /** @todo: get question with id */
    private handleGetQuestionById = async (id: string): Promise<Either<QuestionsEntity, AppError>> => {
        const question = await this._questionService.getById(id);
        if (!question) return failure(new AppError(`Not have question with id ${id}`, 400));
        return success(question);
    };

    /** @todo: restore question */
    private handleRestoreQuestion = async (id: string): Promise<Either<string, AppError>> => {
        await this._questionService.restore(id);
        return success('oke');
    };
}
