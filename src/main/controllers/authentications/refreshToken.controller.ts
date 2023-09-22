import { NextFunction, Response } from "express";
import UsersEntity from "src/domain/entities/user.entity";
import AppError from "src/error-handling/app.error";
import { ENV } from "src/main/config/env.config";
import catchAsync from "src/shared/catch-async";
import { HttpRequestUser } from "src/shared/entities/http.entity";
import { Either, success } from "src/shared/functions";
import { TokenGeneratorAdapter } from "src/shared/jwt/jwtAdapter";
import { v4 as uuidv4 } from "uuid";

/** Define refresh token controller */
export class RefreshTokenController {
    /** execute function */
    execute = catchAsync(
        async (req: HttpRequestUser, res: Response, next: NextFunction) => {
            /** @todo: generate token by email and id */
            const generateTokenResult = await this.handleGenerateToken(
                req.userInfor
            );
            if (generateTokenResult.isFailure())
                return next(generateTokenResult.error);
            const { data: _token } = generateTokenResult;

            /** @todo: generate refresh token by email and id */
            const generateRefreshTokenResult =
                await this.handleGenerateRefreshToken(req.userInfor);
            if (generateRefreshTokenResult.isFailure())
                return next(generateRefreshTokenResult.error);
            const { data: refreshToken } = generateRefreshTokenResult;

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: `Login with email ${req.body.email} success`,
                data: {
                    accessToken: _token,
                    refreshToken: refreshToken,
                },
            });
        }
    );
    /** @todo: generate token by email and id */
    private handleGenerateToken = async (
        user: UsersEntity
    ): Promise<Either<string, AppError>> => {
        const { jwtSecret, expiresIn } = ENV;
        const tokenGeneratorAdapter = new TokenGeneratorAdapter(
            jwtSecret,
            expiresIn
        );
        const _key = { email: user.email, id: user.id, uuid: uuidv4() };
        const token = await tokenGeneratorAdapter.generate(_key);
        return success(token);
    };

    /** @todo: generate refresh token by email and id */
    private handleGenerateRefreshToken = async (
        user: UsersEntity
    ): Promise<Either<string, AppError>> => {
        const { jwtSecret } = ENV;
        const tokenGeneratorAdapter = new TokenGeneratorAdapter(
            jwtSecret,
            "30d"
        );
        const _key = { email: user.email, id: user.id, uuid: uuidv4() };
        const refreshToken = await tokenGeneratorAdapter.generate(_key);
        return success(refreshToken);
    };
}
