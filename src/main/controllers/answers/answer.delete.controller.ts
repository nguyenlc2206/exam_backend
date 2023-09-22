import { NextFunction, Request, Response } from 'express';
import { AnswersServices } from '~/application/services/answers/answers.services';
import AnswersEntity from '~/domain/entities/answer.entity';
import AppError from '~/error-handling/app.error';
import catchAsync from '~/shared/catch-async';
import { Either, failure, success } from '~/shared/functions';

/** define delete answers controller */
export class DeleteAnswerController {
    constructor(private _answerService: AnswersServices<AnswersEntity>) {}

    /** execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: check id is exists in database */
        const checkIdError = await this.handleCheckIdExists(req.params.id);
        if (checkIdError.isFailure()) return next(checkIdError.error);

        /** @todo: processing delete */
        const deleteAnswerResult = await this.handleDeleteAnswer(req.params.id);
        if (deleteAnswerResult.isFailure()) return next(deleteAnswerResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Delete answer is success',
            data: {}
        });
    });

    /** @todo: check id is exists in database */
    private handleCheckIdExists = async (id: string): Promise<Either<AnswersEntity, AppError>> => {
        const itemGetById = await this._answerService.getById(id);
        if (!itemGetById) return failure(new AppError('Answer id is not exists!', 400));
        return success(itemGetById);
    };

    /** @todo: processing delete */
    private handleDeleteAnswer = async (id: string): Promise<Either<boolean, AppError>> => {
        await this._answerService.delete(id);
        return success(true);
    };
}
