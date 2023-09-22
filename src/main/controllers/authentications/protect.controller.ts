import { UsersServices } from '@src/application/services/users/users.services';
import UsersEntity from '@src/domain/entities/user.entity';
import AppError from '@src/error-handling/app.error';
import { ENV } from '@src/main/config/env.config';
import catchAsync from '@src/shared/catch-async';
import { HttpRequestUser, UserInformation, HttpRequest } from '@src/shared/entities/http.entity';
import { DecodeAccountTokenType } from '@src/shared/entities/jwt.entity';
import { Either, failure, success } from '@src/shared/functions';
import { TokenGeneratorAdapter } from '@src/shared/jwt/jwtAdapter';
import { NextFunction, Response } from 'express';

/** Define protect controller */
export class ProtectRoutesController {
    constructor(private _userService: UsersServices<UsersEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        /** @todo: Getting tokken and check of it's there**/
        const getAccessTokenResult = this.handleGetTokenFromHeaders(req);
        if (getAccessTokenResult.isFailure()) return next(getAccessTokenResult.error);
        const { data: _accessToken } = getAccessTokenResult;

        /** @todo: Verification token **/
        const verifyTokenResult = await this.handleVerifyToken(_accessToken);
        if (verifyTokenResult.isFailure()) return next(verifyTokenResult.error);
        const { key: _key, iat: _iat } = verifyTokenResult.data;
        const keyParse = JSON.parse(JSON.stringify(_key));

        /** @todo: Check if user still exists by email **/
        const getUserByEmail = await this.handleGetUserByEmail(keyParse?.email);
        if (getUserByEmail.isFailure()) return next(getUserByEmail.error);
        // get information from data decode
        const { name: roleUser, id: groupId } = getUserByEmail.data.group;
        // get information from data user
        const {
            email: emailUser,
            id: userId,
            passwordChangedAt: _passwordChangedAt,
            password: _password
        } = getUserByEmail.data;
        const userInfo = {
            email: emailUser,
            role: roleUser,
            groupId: groupId,
            userId: userId,
            password: _password
        } as UserInformation;

        /** @todo: Check if user changed password after the token was issued **/
        const checkPasswordChangedAfter = this.handlePasswordChangedAfter(_iat, _passwordChangedAt);
        if (checkPasswordChangedAfter.isFailure()) return next(checkPasswordChangedAfter.error);

        req.userInfor = userInfo;
        next();
    });

    /** @todo: Getting tokken and check of it's there**/
    private handleGetTokenFromHeaders = (req: HttpRequest): Either<string, AppError> => {
        let accessToken;
        if (req.headers?.authorization && req.headers?.authorization.startsWith('Bearer')) {
            accessToken = req.headers?.authorization.split(' ')[1];
        }
        if (!accessToken) return failure(new AppError('You are not login. Please login to get access!', 401));
        return success(accessToken);
    };

    /** @todo: Verification token **/
    private handleVerifyToken = async (token: string): Promise<Either<DecodeAccountTokenType, AppError>> => {
        const { jwtSecret, expiresIn } = ENV;
        const tokenGeneratorAdapter = new TokenGeneratorAdapter(jwtSecret, expiresIn);
        const decode = await tokenGeneratorAdapter.decrypt(token);
        return success(decode);
    };

    /** @todo: Check if user still exists by email **/
    private handleGetUserByEmail = async (email: string): Promise<Either<UsersEntity, AppError>> => {
        const userFinded = await this._userService.getUserByEmail(email, true);
        if (!userFinded) return failure(new AppError('Email is not exists in database!', 400));
        return success(userFinded);
    };

    /** @todo: Check if user changed password after the token was issued **/
    private handlePasswordChangedAfter = (timeDecode: number, passwordChangedAt: Date): Either<boolean, AppError> => {
        const numberChangeAt = passwordChangedAt.getTime();
        const changedTimestamp = parseInt((numberChangeAt / 1000).toString(), 10);
        if (timeDecode < changedTimestamp)
            return failure(new AppError('User recently change password! Please login again.', 401));
        return success(false);
    };
}
