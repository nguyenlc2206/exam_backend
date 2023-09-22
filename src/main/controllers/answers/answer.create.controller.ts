import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { AnswersServices } from '~/application/services/answers/answers.services';
import { QuestionsServices } from '~/application/services/questions/questions.services';
import AnswersEntity from '~/domain/entities/answer.entity';
import QuestionsEntity from '~/domain/entities/question.entity';
import AppError from '~/error-handling/app.error';
import catchAsync from '~/shared/catch-async';
import { HttpRequest } from '~/shared/entities/http.entity';
import { Either, success, failure } from '~/shared/functions';

/** define create anwsers controller */
export class CreateAnwserController {
    constructor(
        private _questionService: QuestionsServices<QuestionsEntity>,
        private _answerService: AnswersServices<AnswersEntity>
    ) {}

    /** execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation field */
        //

        /** @todo: get all list id questions in database */
        const listIds = await this.handleGetAllQuestionsId();
        if (listIds.isFailure()) return next(listIds.error);

        /** @todo: check list id question of body */
        const checkListIdResult = this.handleCheckListIds(req, listIds.data);
        if (checkListIdResult.isFailure()) return next(checkListIdResult.error);

        /** @todo: check and remove answers */

        /** @todo: save data to table answers_entity */
        const saveAnswersResult = await this.handleCreateAnswers(req);
        if (saveAnswersResult.isFailure()) return next(saveAnswersResult.error);

        /** @todo: save data correct questions_entity */
        const saveAnswersCorrectResult = await this.handleUpdateAnswerCorrect(saveAnswersResult.data);
        if (saveAnswersCorrectResult.isFailure()) return next(saveAnswersCorrectResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: '',
            data: {
                answers: saveAnswersResult.data
            }
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {};

    /** @todo: get all list id questions in database */
    private handleGetAllQuestionsId = async (): Promise<Either<Array<string>, AppError>> => {
        const questions = await this._questionService.getAll();
        const questionssId: Array<string> = [];
        Object.values(questions).map((item) => {
            questionssId.push(item.id);
        });
        return success(questionssId);
    };

    /** @todo: check list id question of body */
    private handleCheckListIds = (req: HttpRequest, listIds: Array<string>): Either<boolean, AppError> => {
        /** @todo: get all list id questions in data input */
        const listIdsData: Array<string>[] = [];
        Object.values(req.body.data).map((item: any) => {
            listIdsData.push(item.questionId);
        });

        /** @todo: compare 2 list ids*/
        const hasAllElems = listIdsData.every((elem: any) => listIds.includes(elem));
        if (!hasAllElems) return failure(new AppError('Something wrong list questions ids!', 400));
        return success(true);
    };

    /** @todo: get all answers by question id */
    private handleGetAnswersByQuestionId = async (id: string): Promise<Either<AnswersEntity[], AppError>> => {
        const answers = await this._answerService.getByQuestionId(id);
        return success(answers);
    };

    /** @todo: delete answers exists */
    private handleDeleteAnswers = async (item: AnswersEntity[]): Promise<void> => {
        await this._answerService.remove(item);
    };

    /** @todo: save data to table answers_entity */
    private handleCreateAnswers = async (req: Request): Promise<Either<AnswersEntity[], AppError>> => {
        // processing data save to answer database
        const _listAnswers: AnswersEntity[] = [];

        Object.values(req.body.data).map(async (question: any) => {
            Object.values(question.answers).map((answer: any) => {
                const _answer = new AnswersEntity();
                _answer.question = question?.questionId;
                _answer.title = answer?.title;
                _answer.status = answer?.select;
                _listAnswers.push(_answer);
            });

            /** @todo: get all answers by question id */
            const listAnswersExists = await this.handleGetAnswersByQuestionId(question?.questionId);
            if (listAnswersExists.isFailure()) return failure(listAnswersExists.error);

            /** @todo: delete answers exists */
            if (listAnswersExists.data.length) await this.handleDeleteAnswers(listAnswersExists.data);
            return;
        });

        const newItem = await this._answerService.create(_listAnswers);
        return success(newItem);
    };

    /** @todo: save data correct questions_entity */
    private handleUpdateAnswerCorrect = async (
        items: AnswersEntity[]
    ): Promise<Either<QuestionsEntity[], AppError>> => {
        const _listQuestions: QuestionsEntity[] = [];
        Object.values(items).map(async (ele: any) => {
            if (ele?.status === true) {
                const question = new QuestionsEntity();
                question.id = ele?.question;
                question.answerCorrectId = ele?.id;
                const newItem = await this._questionService.update(question);
                _listQuestions.push(newItem);
            }
        });

        return success(_listQuestions);
    };
}
