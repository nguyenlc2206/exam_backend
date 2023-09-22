import { NextFunction, Request, Response } from "express";
import { CategoryServices } from "src/application/services/categories/category.services";
import ExamsCategoryEntity from "src/domain/entities/exam.category.entity";
import AppError from "src/error-handling/app.error";
import catchAsync from "src/shared/catch-async";
import { HttpRequest } from "src/shared/entities/http.entity";
import { Either, Validation, failure, success } from "src/shared/functions";
import { ValidationComposite } from "src/shared/validations";
import { RequiredFieldValidation } from "src/shared/validations/requiredFields";

/** Define create category controller */
export class CreateCategoryController {
    constructor(
        private _categoryService: CategoryServices<ExamsCategoryEntity>
    ) {}

    /** define execute function */
    execute = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError) return next(validationError);

            /** @todo: check name exists */
            const checkNameResult = await this.hanleCheckNameExists(
                req.body.name
            );
            if (checkNameResult.isFailure()) return next(checkNameResult.error);

            /** @todo: save category to database */
            const newCategory = await this.handleCreateCategory(req.body);
            if (newCategory.isFailure()) return next(newCategory.error);

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: "Insert category to database success",
                data: {
                    item: newCategory.data,
                },
            });
        }
    );

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ["name"];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: check name exists */
    private hanleCheckNameExists = async (
        name: string
    ): Promise<Either<ExamsCategoryEntity | undefined, AppError>> => {
        const userFinded = await this._categoryService.getCategoryByName(name);
        if (userFinded)
            return failure(new AppError("Name is already in database!", 400));
        return success(userFinded);
    };

    /** @todo: save category to database */
    private handleCreateCategory = async (
        item: ExamsCategoryEntity
    ): Promise<Either<ExamsCategoryEntity, AppError>> => {
        const newItem = await this._categoryService.create(item);
        return success(newItem);
    };
}
