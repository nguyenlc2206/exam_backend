import { NextFunction, Request, Response } from 'express'
import { CreateExamRelationUserController } from './exam.user.create.controller'
import { GetAllExamsWithUserIdController } from './exam.user.getAll.userId.controller'
import { GetAllExamsWithAdminController } from './exam.user.getAll.admin.controller'
import { ExamsServices } from 'src/application/services/exams/exam.services'
import ExamsEntity from 'src/domain/entities/exam.entity'
import { UsersServices } from 'src/application/services/users/users.services'
import UsersEntity from 'src/domain/entities/user.entity'
import { ExamRelationUserServices } from 'src/application/services/exam-user/exam.user.services'
import ExamUserEntity from 'src/domain/entities/examUser.entity'

/** define exam relation user controller */
export class ExamRelationUserController {
    private examsServices: ExamsServices<ExamsEntity>
    private userService: UsersServices<UsersEntity>
    private examUserService: ExamRelationUserServices<ExamUserEntity>

    constructor(
        examsServices: ExamsServices<ExamsEntity>,
        userService: UsersServices<UsersEntity>,
        examUserService: ExamRelationUserServices<ExamUserEntity>
    ) {
        this.examsServices = examsServices
        this.userService = userService
        this.examUserService = examUserService
    }

    /** create exam method */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createExamUser = new CreateExamRelationUserController(
            this.examsServices,
            this.userService,
            this.examUserService
        )
        return createExamUser.execute(req, res, next)
    }

    /** getAll exam by userId method */
    getAllByUserId = async (req: Request, res: Response, next: NextFunction) => {
        const getAllExamsById = new GetAllExamsWithUserIdController(this.examUserService)
        return getAllExamsById.execute(req, res, next)
    }

    /** getAll exam by admin method */
    getAllByAdmin = async (req: Request, res: Response, next: NextFunction) => {
        const getAllExamsByAdmin = new GetAllExamsWithAdminController(this.examUserService)
        return getAllExamsByAdmin.execute(req, res, next)
    }
}
