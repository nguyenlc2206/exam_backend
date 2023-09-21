import { NextFunction, Response } from "express";
import * as _ from "lodash";

import { UsersServices } from "@src/application/services/users/users.services";
import UsersEntity from "@src/domain/entities/user.entity";
import AppError from "@src/error-handling/app.error";
import { ENV } from "@src/main/config/env.config";
import { BcryptAdapter } from "@src/shared/bcrypt/bcryptAdapter";
import catchAsync from "@src/shared/catch-async";
import {
    HttpRequest,
    HttpRequestUser,
    UserInformation,
} from "@src/shared/entities/http.entity";
import { Either, Validation, success } from "@src/shared/functions";
import { ValidationComposite } from "@src/shared/validations";
import { RequiredFieldValidation } from "@src/shared/validations/requiredFields";
import { CompareFieldsValidation } from "@src/shared/validations/compare.validation";

/** define change-password controller */
export class ChangePasswordController {
    constructor(private _userService: UsersServices<UsersEntity>) {}

    /** define execute function */
    execute = catchAsync(
        async (req: HttpRequestUser, res: Response, next: NextFunction) => {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError) return next(validationError);

            /** @todo: check current password is correct */
            const checkPasswordCorrect = await this.handleCheckPasswordCorrect(
                req.body.currentPassword,
                req.userInfor.password
            );
            if (checkPasswordCorrect.isFailure())
                return next(checkPasswordCorrect.error);
            if (!checkPasswordCorrect.data)
                return next(new AppError("Current password is invalid!", 400));

            /** @todo: hash new password */
            const hashPasswordResult = await this.handleHashPassword(
                req.body.newPassword
            );
            if (hashPasswordResult.isFailure())
                return next(hashPasswordResult.error);
            const { data: _hashPassword } = hashPasswordResult;

            /** @todo: change password */
            const changePasswordResult = await this.handleChangePassword(
                req.userInfor,
                _hashPassword
            );
            if (changePasswordResult.isFailure())
                return next(changePasswordResult.error);

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: `Change password with email ${req.body.email} success`,
                data: {},
            });
        }
    );

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ["currentPassword", "newPassword", "passwordConfirm"];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        /** @todo: Compare password **/
        validations.push(
            new CompareFieldsValidation("newPassword", "passwordConfirm")
        );

        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: check current password is correct */
    private handleCheckPasswordCorrect = async (
        passwordInformed: string,
        hashPasswordUser: string
    ): Promise<Either<boolean, AppError>> => {
        const { bcryptSalt } = ENV;
        const hasherAdapter = new BcryptAdapter(bcryptSalt);
        const result = await hasherAdapter.compare(
            passwordInformed,
            hashPasswordUser
        );
        return success(result);
    };

    /** @todo: hash new password */
    private handleHashPassword = async (
        password: string
    ): Promise<Either<string, AppError>> => {
        const { bcryptSalt } = ENV;
        const hasher = new BcryptAdapter(bcryptSalt);
        const hashedPassword = await hasher.hash(password);
        return success(hashedPassword);
    };

    /** @todo: change password */
    private handleChangePassword = async (
        item: UserInformation,
        hashPassword: string
    ): Promise<Either<UsersEntity, AppError>> => {
        const { userId: _id } = item;
        const _itemUpdate = {
            id: _id,
            password: hashPassword,
            passwordChangedAt: new Date(Date.now()),
        } as UsersEntity;
        const itemUpdate = await this._userService.update(_itemUpdate);
        return success(itemUpdate);
    };
}
