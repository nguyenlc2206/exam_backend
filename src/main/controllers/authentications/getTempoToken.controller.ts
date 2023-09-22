import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UsersServices } from '~/application/services/users/users.services';
import UsersEntity from '~/domain/entities/user.entity';
import AppError from '~/error-handling/app.error';
import catchAsync from '~/shared/catch-async';
import { HttpRequest } from '~/shared/entities/http.entity';
import { Validation, Either, failure, success } from '~/shared/functions';
import { ValidationComposite } from '~/shared/validations';
import { EmailValidatorAdapter, EmailValidation } from '~/shared/validations/email.validation';
import { RequiredFieldValidation } from '~/shared/validations/requiredFields';

/** Define get tempo token controller */
export class GetTempoTokenController {
    constructor(private _userService: UsersServices<UsersEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation field */
        const validationError = this.handleValidation(req);
        if (validationError) return next(validationError);

        /** @todo: get account from collection by email */
        const getUserByEmailResult = await this.handleGetUserByEmail(req.body.email);
        if (getUserByEmailResult.isFailure()) return next(getUserByEmailResult.error);

        /** @todo: generate temporary token */
        const generateTempoTokenResult = await this.handleGenerateTempoToken(getUserByEmailResult.data);
        if (generateTempoTokenResult.isFailure()) return next(generateTempoTokenResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: `Get temporary token with email ${req.body.email} success`,
            data: {
                tempoToken: generateTempoTokenResult.data
            }
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['email'];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }
        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        /** @todo: Validate Email **/
        const emailValidatorAdapter = new EmailValidatorAdapter();
        validations.push(new EmailValidation('email', emailValidatorAdapter));

        return validationComposite.validate(body);
    };

    /** @todo: get account from collection by email */
    private handleGetUserByEmail = async (email: string): Promise<Either<UsersEntity, AppError>> => {
        const userFinded = await this._userService.getUserByEmail(email);
        if (!userFinded) return failure(new AppError('Email is not exists in database!', 400));
        return success(userFinded);
    };

    /** @todo: generate temporary token */
    private handleGenerateTempoToken = async (user: UsersEntity): Promise<Either<string, AppError>> => {
        // process update tempoTokenExpires to databse
        const { id: _id } = user;
        const _itemUpdate = {
            id: _id,
            email: user?.email
        } as UsersEntity;

        const tempoToken = jwt.sign(
            {
                data: _itemUpdate
            },
            'HS256',
            { expiresIn: '10m' }
        );

        return success(tempoToken);
    };
}
