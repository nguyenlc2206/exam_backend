import { NextFunction, Request, Response } from 'express';

import { ExamRelationUserServices } from '@src/application/services/exam-user/exam.user.services';
import { ExamsServices } from '@src/application/services/exams/exam.services';
import { UsersServices } from '@src/application/services/users/users.services';
import ExamsEntity from '@src/domain/entities/exam.entity';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import UsersEntity from '@src/domain/entities/user.entity';
import { CreateExamRelationUserController } from '@src/main/controllers/exam-user/exam.user.create.controller';
import { GetAllExamsWithAdminController } from '@src/main/controllers/exam-user/exam.user.getAll.admin.controller';
import { GetAllExamsWithUserIdController } from '@src/main/controllers/exam-user/exam.user.getAll.userId.controller';
import { GetAllExamsByUserIdController } from './exam.user.getExamByUserId.controller';

/** define exam relation user controller */
export class ExamRelationUserController {
    private examsServices: ExamsServices<ExamsEntity>;
    private userService: UsersServices<UsersEntity>;
    private examUserService: ExamRelationUserServices<ExamUserEntity>;

    constructor(
        examsServices: ExamsServices<ExamsEntity>,
        userService: UsersServices<UsersEntity>,
        examUserService: ExamRelationUserServices<ExamUserEntity>
    ) {
        this.examsServices = examsServices;
        this.userService = userService;
        this.examUserService = examUserService;
    }

    /** create exam method */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createExamUser = new CreateExamRelationUserController(
            this.examsServices,
            this.userService,
            this.examUserService
        );
        return createExamUser.execute(req, res, next);
    };

    /** getAll exam by userId method */
    getAllByUserId = async (req: Request, res: Response, next: NextFunction) => {
        const getAllExamsById = new GetAllExamsWithUserIdController(this.examUserService);
        return getAllExamsById.execute(req, res, next);
    };

    /** get exams by userId method */
    getByUserId = async (req: Request, res: Response, next: NextFunction) => {
        const getAllExamsById = new GetAllExamsByUserIdController(this.examUserService);
        return getAllExamsById.execute(req, res, next);
    };

    /** getAll exam by admin method */
    getAllByAdmin = async (req: Request, res: Response, next: NextFunction) => {
        const getAllExamsByAdmin = new GetAllExamsWithAdminController(this.examUserService);
        return getAllExamsByAdmin.execute(req, res, next);
    };
}
