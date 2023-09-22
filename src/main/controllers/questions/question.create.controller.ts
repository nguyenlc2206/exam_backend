import { NextFunction, Response } from 'express';
import { ExamsServices } from '~/application/services/exams/exam.services';
import { QuestionsServices } from '~/application/services/questions/questions.services';
import ExamsEntity from '~/domain/entities/exam.entity';
import QuestionsEntity from '~/domain/entities/question.entity';
import AppError from '~/error-handling/app.error';
import catchAsync from '~/shared/catch-async';
import { HttpRequestUser, HttpRequest } from '~/shared/entities/http.entity';
import { Validation, Either, failure, success } from '~/shared/functions';
import { ValidationComposite } from '~/shared/validations';
import { RequiredFieldValidation } from '~/shared/validations/requiredFields';

/** define create question controller */
export class CreateQuestionController {
    constructor(
        private _questionService: QuestionsServices<QuestionsEntity>,
        private _examService: ExamsServices<ExamsEntity>
    ) {}

    /** execute function */
    execute = catchAsync(async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        /** @todo: validation field */
        const validationError = this.handleValidation(req);
        if (validationError) return next(validationError);

        /** @todo: check id exam exists */
        const checkIdExamResult = await this.handleCheckIdExam(req.body.examId);
        if (checkIdExamResult.isFailure()) return next(checkIdExamResult.error);

        /** @todo: save data to table questions_entity */
        const saveQuestionsResult = await this.handleCreateQuestions(req.body);
        if (saveQuestionsResult.isFailure()) return next(saveQuestionsResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: `Insert questions with ${req.body.examId} to database success`,
            data: {
                questions: saveQuestionsResult.data
            }
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['questions', 'examId'];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: check id exam exists */
    private handleCheckIdExam = async (id: string): Promise<Either<ExamsEntity | undefined, AppError>> => {
        const exam = await this._examService.getById(id);
        if (!exam) return failure(new AppError('ExamId is not exists in database!', 400));
        return success(exam);
    };

    /** @todo: save data to table questions_entity */
    private handleCreateQuestions = async (body: any): Promise<Either<QuestionsEntity[], AppError>> => {
        // processing data before save to database
        const _listQuestions: QuestionsEntity[] = [];
        Object.values(body.questions).map((item: any) => {
            const question = new QuestionsEntity();
            question.exam = body.examId;
            question.title = item?.title;
            question.subTitle = item?.subTitle;
            _listQuestions.push(question);
        });
        const newItems = await this._questionService.create(_listQuestions);
        return success(newItems);
    };
}
