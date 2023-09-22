import { NextFunction, Request, Response } from 'express';
import { ExamsServices } from '~/application/services/exams/exam.services';
import ExamsEntity from '~/domain/entities/exam.entity';
import AppError from '~/error-handling/app.error';
import catchAsync from '~/shared/catch-async';
import { HttpRequest } from '~/shared/entities/http.entity';
import { Validation, Either, failure, success } from '~/shared/functions';
import { ValidationComposite } from '~/shared/validations';
import { RequiredFieldValidation } from '~/shared/validations/requiredFields';

/** define update exam controller */
export class UpdateExamController {
    constructor(private _examsServices: ExamsServices<ExamsEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation fields */
        const validationError = this.handleValidation(req);
        if (validationError) return next(validationError);

        /** @todo: get exam by id */
        const examGetResult = await this.handleGetExamById(req.body.id);
        if (examGetResult.isFailure()) return next(examGetResult.error);

        /** @todo: process update exam */
        const updateExamResult = await this.handleUpdateExam(req.body);
        if (updateExamResult.isFailure()) return next(updateExamResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Update exam to database success',
            data: {}
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['id'];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: get exam by id */
    private handleGetExamById = async (id: string): Promise<Either<ExamsEntity, AppError>> => {
        const examFinded = await this._examsServices.getById(id);
        if (!examFinded) return failure(new AppError('Exam id is not exists!', 400));
        return success(examFinded);
    };

    /** @todo: process update exam */
    private handleUpdateExam = async (item: ExamsEntity): Promise<Either<ExamsEntity, AppError>> => {
        const itemUpdate = await this._examsServices.update(item);
        return success(itemUpdate);
    };
}
