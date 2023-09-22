import { ExamRelationUserServices } from '@src/application/services/exam-user/exam.user.services';
import { ExamsServices } from '@src/application/services/exams/exam.services';
import { UsersServices } from '@src/application/services/users/users.services';
import ExamsEntity from '@src/domain/entities/exam.entity';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import UsersEntity from '@src/domain/entities/user.entity';
import AppError from '@src/error-handling/app.error';
import catchAsync from '@src/shared/catch-async';
import { HttpRequest } from '@src/shared/entities/http.entity';
import { Validation, Either, failure, success } from '@src/shared/functions';
import { ValidationComposite } from '@src/shared/validations';
import { RequiredFieldValidation } from '@src/shared/validations/requiredFields';
import { NextFunction, Request, Response } from 'express';

/** Define exam relation with user controller */
export class CreateExamRelationUserController {
    constructor(
        private _examsServices: ExamsServices<ExamsEntity>,
        private _userService: UsersServices<UsersEntity>,
        private _examUserService: ExamRelationUserServices<ExamUserEntity>
    ) {}

    /** execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation fields */
        const validationError = this.handleValidation(req);
        if (validationError) return next(validationError);

        /** @todo: check id user exists */
        const checkIdUserResult = await this.handleCheckIdUser(req.body.userId);
        if (checkIdUserResult.isFailure()) return next(checkIdUserResult.error);

        /** @todo: check id exam exists */
        const getIdExamsResult = await this.handleGetAllExamId();
        if (getIdExamsResult.isFailure()) return next(getIdExamsResult.error);

        const { data: listIds } = getIdExamsResult;
        const hasAllElems = req.body.examId.every((elem: string) => listIds.includes(elem));
        if (!hasAllElems) return next(new AppError('Something wrong from list exam ids!', 400));

        /** @todo: save data to table exam_user_entity */
        const _listExamUser: ExamUserEntity[] = [];
        Object.values(req.body.examId).map((item: any) => {
            const examUser = new ExamUserEntity();
            examUser.exam = item;
            examUser.user = req.body.userId;
            _listExamUser.push(examUser);
        });
        const newExamUser = await this.handleCreateExamUser(_listExamUser);
        if (newExamUser.isFailure()) return next(newExamUser.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Access exam to user to database success',
            data: {
                item: newExamUser.data
            }
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['examId', 'userId'];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: check id user exists */
    private handleCheckIdUser = async (id: string): Promise<Either<UsersEntity, AppError>> => {
        const user = await this._userService.getUserById(id);
        if (!user) return failure(new AppError('User is not exists in database!', 400));
        return success(user);
    };

    /** @todo: check id exam exists */
    private handleGetAllExamId = async (): Promise<Either<Array<string>, AppError>> => {
        const exams = await this._examsServices.getAll();
        const examsId: Array<string> = [];
        Object.values(exams).map((item) => {
            examsId.push(item.id);
        });
        return success(examsId);
    };

    /** @todo: save exams relation with user to database */
    private handleCreateExamUser = async (item: ExamUserEntity[]): Promise<Either<ExamUserEntity[], AppError>> => {
        const newItem = await this._examUserService.create(item);
        return success(newItem);
    };
}
