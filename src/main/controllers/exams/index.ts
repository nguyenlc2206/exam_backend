import { CategoryServices } from '@src/application/services/categories/category.services';
import { ExamsServices } from '@src/application/services/exams/exam.services';
import ExamsCategoryEntity from '@src/domain/entities/exam.category.entity';
import ExamsEntity from '@src/domain/entities/exam.entity';
import { NextFunction, Request, Response } from 'express';
import { CreateExamController } from '@src/main/controllers/exams/exam.create.controller';
import { GetAllExamsController } from '@src/main/controllers/exams/exam.getAll.controller';
import { GetExamByIdController } from '@src/main/controllers/exams/exam.getById.controller';
import { UpdateExamController } from '@src/main/controllers/exams/exam.update.controller';

/** define exams controller */
export class ExamsController {
    private exmaService: ExamsServices<ExamsEntity>;
    private categoryService: CategoryServices<ExamsCategoryEntity>;

    constructor(exmaService: ExamsServices<ExamsEntity>, categoryService: CategoryServices<ExamsCategoryEntity>) {
        this.exmaService = exmaService;
        this.categoryService = categoryService;
    }

    /** create exam method */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createExam = new CreateExamController(this.exmaService, this.categoryService);
        return createExam.execute(req, res, next);
    };

    /** create exam method */
    update = async (req: Request, res: Response, next: NextFunction) => {
        const updateExam = new UpdateExamController(this.exmaService);
        return updateExam.execute(req, res, next);
    };

    /** getAll exam method */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const getAllExams = new GetAllExamsController(this.exmaService);
        return getAllExams.execute(req, res, next);
    };

    /** get exam by id method */
    getExamById = async (req: Request, res: Response, next: NextFunction) => {
        const getExam = new GetExamByIdController(this.exmaService);
        return getExam.execute(req, res, next);
    };
}
