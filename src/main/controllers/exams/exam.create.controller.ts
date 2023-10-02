import { CategoryServices } from '@src/application/services/categories/category.services';
import { ExamsServices } from '@src/application/services/exams/exam.services';
import ExamsCategoryEntity from '@src/domain/entities/exam.category.entity';
import ExamsEntity from '@src/domain/entities/exam.entity';
import AppError from '@src/error-handling/app.error';
import catchAsync from '@src/shared/catch-async';
import { HttpRequestUser, HttpRequest } from '@src/shared/entities/http.entity';
import { Validation, Either, failure, success } from '@src/shared/functions';
import { ValidationComposite } from '@src/shared/validations';
import { RequiredFieldValidation } from '@src/shared/validations/requiredFields';
import { NextFunction, Response } from 'express';

/** define create exam controller */
export class CreateExamController {
    constructor(
        private _examsServices: ExamsServices<ExamsEntity>,
        private _categoryServices: CategoryServices<ExamsCategoryEntity>
    ) {}

    /** execute function */
    execute = catchAsync(async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        /** @todo: validation fields */
        const validationError = this.handleValidation(req);
        if (validationError) return next(validationError);

        /** @todo: get category id with name category */
        const getIdCategory = await this.handleGetIdCategory(req.body.category);
        if (getIdCategory.isFailure()) return next(getIdCategory.error);
        const { data: categoryId } = getIdCategory;
        const { userId: userId } = req.userInfor;

        /** @todo: save exams to database */
        const examCreate = {
            ...req.body,
            user: userId,
            category: categoryId
        } as ExamsEntity;
        const newExam = await this.handleCreateExam(examCreate);
        if (newExam.isFailure()) return next(newExam.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Insert exam to database success',
            data: {
                exam: newExam.data
            }
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['title', 'subTitle', 'category'];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: get category id with name category */
    private handleGetIdCategory = async (name: string): Promise<Either<string, AppError>> => {
        const itemCategory = await this._categoryServices.getCategoryByName(name);
        if (!itemCategory) return failure(new AppError('Name category not exists!', 400));
        return success(itemCategory?.id);
    };

    /** @todo: save exams to database */
    private handleCreateExam = async (item: ExamsEntity): Promise<Either<ExamsEntity, AppError>> => {
        const newItem = await this._examsServices.create(item);
        return success(newItem);
    };
}
