import { CategoryServices } from '@src/application/services/categories/category.services';
import ExamsCategoryEntity from '@src/domain/entities/exam.category.entity';
import { NextFunction, Request, Response } from 'express';
import { CreateCategoryController } from '@src/main/controllers/categories/category.create.controller';
import { GetAllCategoryController } from '@src/main/controllers/categories/category.getAll.controller';

/** define category controller */
export class CategoryController {
    private service: CategoryServices<ExamsCategoryEntity>;

    constructor(service: CategoryServices<ExamsCategoryEntity>) {
        this.service = service;
    }

    /** create category method */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createCategory = new CreateCategoryController(this.service);
        return createCategory.execute(req, res, next);
    };

    /** get all category method */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const getAllCategories = new GetAllCategoryController(this.service);
        return getAllCategories.execute(req, res, next);
    };
}
