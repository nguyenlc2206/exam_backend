import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { UsersServices } from '~/application/services/users/users.services';
import UsersEntity from '~/domain/entities/user.entity';
import AppError from '~/error-handling/app.error';
import { ENV } from '~/main/config/env.config';
import { BcryptAdapter } from '~/shared/bcrypt/bcryptAdapter';
import catchAsync from '~/shared/catch-async';
import { HttpRequest } from '~/shared/entities/http.entity';
import { Validation, Either, failure, success } from '~/shared/functions';
import { TokenGeneratorAdapter } from '~/shared/jwt/jwtAdapter';
import { ValidationComposite } from '~/shared/validations';
import { EmailValidatorAdapter, EmailValidation } from '~/shared/validations/email.validation';
import { RequiredFieldValidation } from '~/shared/validations/requiredFields';

/** Define login controller */
export class LoginCotroller {
    constructor(private _userService: UsersServices<UsersEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation field */
        const validationError = this.handleValidation(req);
        if (validationError) return next(validationError);

        /** @todo: get user by email */
        const getUserByEmailResult = await this.handleGetUserByEmail(req.body.email);
        if (getUserByEmailResult.isFailure()) return next(getUserByEmailResult.error);

        /** @todo: compare password */
        const { password: _hashPassword } = getUserByEmailResult.data;
        const comparePasswordResult = await this.handleComparePassword(req.body.password, _hashPassword);
        if (comparePasswordResult.isFailure()) return next(comparePasswordResult.error);
        if (!comparePasswordResult.data) return next(new AppError('Password is wrong!', 400));

        /** @todo: generate token by email and id */
        const generateTokenResult = await this.handleGenerateToken(getUserByEmailResult.data);
        if (generateTokenResult.isFailure()) return next(generateTokenResult.error);
        const { data: _token } = generateTokenResult;

        /** @todo: generate refresh token by email and id */
        const generateRefreshTokenResult = await this.handleGenerateRefreshToken(getUserByEmailResult.data);
        if (generateRefreshTokenResult.isFailure()) return next(generateRefreshTokenResult.error);
        const { data: refreshToken } = generateRefreshTokenResult;

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: `Login with email ${req.body.email} success`,
            data: {
                accessToken: _token,
                refreshToken: refreshToken
            }
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['email', 'password'];

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

    /** @todo: get user by email */
    private handleGetUserByEmail = async (email: string): Promise<Either<UsersEntity, AppError>> => {
        const userFinded = await this._userService.getUserByEmail(email);
        if (!userFinded) return failure(new AppError('Email is not exists in database!', 400));
        return success(userFinded);
    };

    /** @todo: compare password */
    private handleComparePassword = async (
        passwordInformed: string,
        hashPasswordUser: string
    ): Promise<Either<boolean, AppError>> => {
        const { bcryptSalt } = ENV;
        const hasherAdapter = new BcryptAdapter(bcryptSalt);
        const result = await hasherAdapter.compare(passwordInformed, hashPasswordUser);
        return success(result);
    };

    /** @todo: generate token by email and id */
    private handleGenerateToken = async (user: UsersEntity): Promise<Either<string, AppError>> => {
        const { jwtSecret, expiresIn } = ENV;
        const tokenGeneratorAdapter = new TokenGeneratorAdapter(jwtSecret, expiresIn);
        const _key = { email: user.email, id: user.id };
        const token = await tokenGeneratorAdapter.generate(_key);
        return success(token);
    };

    /** @todo: generate refresh token by email and id */
    private handleGenerateRefreshToken = async (user: UsersEntity): Promise<Either<string, AppError>> => {
        const { jwtSecret } = ENV;
        const tokenGeneratorAdapter = new TokenGeneratorAdapter(jwtSecret, '30d');
        const _key = { email: user.email, id: user.id, uuid: uuidv4() };
        const refreshToken = await tokenGeneratorAdapter.generate(_key);
        return success(refreshToken);
    };
}
