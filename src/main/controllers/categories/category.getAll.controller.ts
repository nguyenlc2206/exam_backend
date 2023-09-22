import { NextFunction, Request, Response } from 'express'
import { CategoryServices } from 'src/application/services/categories/category.services'
import ExamsCategoryEntity from 'src/domain/entities/exam.category.entity'
import AppError from 'src/error-handling/app.error'
import catchAsync from 'src/shared/catch-async'
import { Either, success } from 'src/shared/functions'

/** defind getAll controller */
export class GetAllCategoryController {
    constructor(private _categorySevices: CategoryServices<ExamsCategoryEntity>) {}

    /** @todo: execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: getAll category */
        const listCategoriesResult = await this.handleGetAllCategory()
        if (listCategoriesResult.isFailure()) return next(listCategoriesResult.error)

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Get list category success',
            data: {
                items: listCategoriesResult.data
            }
        })
    })

    /** @todo: getAll category */
    private handleGetAllCategory = async (): Promise<Either<ExamsCategoryEntity[], AppError>> => {
        const listAllCategories = await this._categorySevices.getAll()
        return success(listAllCategories)
    }
}
