import { UsersServices } from '@src/application/services/users/users.services';
import UsersEntity from '@src/domain/entities/user.entity';
import AppError from '@src/error-handling/app.error';
import { ENV } from '@src/main/config/env.config';
import { BcryptAdapter } from '@src/shared/bcrypt/bcryptAdapter';
import catchAsync from '@src/shared/catch-async';
import { HttpRequest } from '@src/shared/entities/http.entity';
import { Validation, Either, failure, success } from '@src/shared/functions';
import { ValidationComposite } from '@src/shared/validations';
import { CompareFieldsValidation } from '@src/shared/validations/compare.validation';
import { EmailValidatorAdapter, EmailValidation } from '@src/shared/validations/email.validation';
import { RequiredFieldValidation } from '@src/shared/validations/requiredFields';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/** define forgot password controller */
export class ForgotPasswordController {
    constructor(private _userService: UsersServices<UsersEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation field */
        const validationError = this.handleValidation(req);
        if (validationError) return next(validationError);

        /** @todo: validation field headers */
        const getAccessTokenResult = this.handleGetTokenFromHeaders(req);
        if (getAccessTokenResult.isFailure()) return next(getAccessTokenResult.error);
        const { data: _tempoToken } = getAccessTokenResult;

        /** @todo: get account from collection by email */
        const getUserByEmailResult = await this.handleGetUserByEmail(req.body.email);
        if (getUserByEmailResult.isFailure()) return next(getUserByEmailResult.error);

        /** @todo: verify token expires */
        const verifyTempToken = await this.handleVerifyTempoToken(_tempoToken);
        if (verifyTempToken.isFailure()) return next(verifyTempToken.error);

        /** @todo: hash password */
        const hashPasswordResult = await this.handleHashPassword(req.body.password);
        if (hashPasswordResult.isFailure()) return next(hashPasswordResult.error);
        const { data: _hashPassword } = hashPasswordResult;

        /** @todo: update password */
        const updatePasswordResult = await this.handleUpdatePassword(getUserByEmailResult.data, _hashPassword);
        if (updatePasswordResult.isFailure()) return next(updatePasswordResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: `Change password with email ${req.body.email} success`,
            data: {}
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['email', 'password', 'passwordConfirm'];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        /** @todo: Compare password **/
        validations.push(new CompareFieldsValidation('password', 'passwordConfirm'));

        /** @todo: Validate Email **/
        const emailValidatorAdapter = new EmailValidatorAdapter();
        validations.push(new EmailValidation('email', emailValidatorAdapter));

        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: validation field headers */
    private handleGetTokenFromHeaders = (req: HttpRequest): Either<string, AppError> => {
        let tempoToken;
        if (req.headers?.authorization && req.headers?.authorization.startsWith('Bearer')) {
            tempoToken = req.headers?.authorization.split(' ')[1];
        }
        if (!tempoToken) return failure(new AppError('You are not login. Please login to get access!', 401));
        return success(tempoToken);
    };

    /** @todo: get account from collection by email */
    private handleGetUserByEmail = async (email: string): Promise<Either<UsersEntity, AppError>> => {
        const userFinded = await this._userService.getUserByEmail(email);
        if (!userFinded) return failure(new AppError('Email is not exists in database!', 400));
        return success(userFinded);
    };

    /** @todo: verify token expires */
    private handleVerifyTempoToken = async (tempoToken: string): Promise<Either<boolean, AppError>> => {
        const decode = jwt.verify(tempoToken, 'HS256');
        return success(true);
    };

    /** @todo: hash password */
    private handleHashPassword = async (password: string): Promise<Either<string, AppError>> => {
        const { bcryptSalt } = ENV;
        const hasher = new BcryptAdapter(bcryptSalt);
        const hashedPassword = await hasher.hash(password);
        return success(hashedPassword);
    };

    /** @todo: update password */
    private handleUpdatePassword = async (
        item: UsersEntity,
        hashPassword: string
    ): Promise<Either<UsersEntity, AppError>> => {
        const { id: _id } = item;
        const _itemUpdate = {
            id: _id,
            password: hashPassword,
            passwordChangedAt: new Date(Date.now())
        } as UsersEntity;
        const itemUpdate = await this._userService.update(_itemUpdate);
        return success(itemUpdate);
    };
}
