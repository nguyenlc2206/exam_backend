import { NextFunction, Request, Response } from 'express';
import { QuestionsServices } from '../../../application/services/questions/questions.services';
import QuestionsEntity from '../../../domain/entities/question.entity';
import AppError from '../../../error-handling/app.error';
import catchAsync from '../../../shared/catch-async';
import { Either, failure, success } from '../../../shared/functions';

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
