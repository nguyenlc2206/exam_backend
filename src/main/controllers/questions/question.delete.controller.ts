import { QuestionsServices } from '@src/application/services/questions/questions.services';
import QuestionsEntity from '@src/domain/entities/question.entity';
import AppError from '@src/error-handling/app.error';
import catchAsync from '@src/shared/catch-async';
import { Either, failure, success } from '@src/shared/functions';
import { NextFunction, Request, Response } from 'express';

/** define delete question controller */
export class DeleteQuestionController {
    constructor(private _questionsServices: QuestionsServices<QuestionsEntity>) {}

    /** execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: check id is exists in database */
        const checkIdError = await this.handleCheckIdExists(req.params.id);
        if (checkIdError.isFailure()) return next(checkIdError.error);

        /** @todo: processing delete */
        const deleteUserResult = await this.handleDeleteUser(req.params.id);
        if (deleteUserResult.isFailure()) return next(deleteUserResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Delete question is success',
            data: {}
        });
    });

    /** @todo: check id is exists in database */
    private handleCheckIdExists = async (id: string): Promise<Either<QuestionsEntity, AppError>> => {
        const itemGetById = await this._questionsServices.getById(id);
        if (!itemGetById) return failure(new AppError('Question id is not exists!', 400));
        return success(itemGetById);
    };

    /** @todo: processing delete */
    private handleDeleteUser = async (id: string): Promise<Either<boolean, AppError>> => {
        await this._questionsServices.delete(id);
        return success(true);
    };
}
