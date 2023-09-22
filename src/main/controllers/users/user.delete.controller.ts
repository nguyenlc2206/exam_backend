import { NextFunction, Request, Response } from "express";
import { UsersServices } from "src/application/services/users/users.services";
import UsersEntity from "src/domain/entities/user.entity";
import AppError from "src/error-handling/app.error";
import catchAsync from "src/shared/catch-async";
import { Either, failure, success } from "src/shared/functions";

/** define delete user controller */
export class DeleteUserController {
    constructor(private _userServices: UsersServices<UsersEntity>) {}

    /** execute function */
    execute = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            /** @todo: check id is exists in database */
            const checkIdError = await this.handleCheckIdExists(req.params.id);
            if (checkIdError.isFailure()) return next(checkIdError.error);

            /** @todo: processing delete */
            const deleteUserResult = await this.handleDeleteUser(req.params.id);
            if (deleteUserResult.isFailure())
                return next(deleteUserResult.error);

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: "Delete user is success",
                data: {},
            });
        }
    );

    /** @todo: check id is exists in database */
    private handleCheckIdExists = async (
        id: string
    ): Promise<Either<UsersEntity, AppError>> => {
        const itemGetById = await this._userServices.getUserById(id);
        if (!itemGetById)
            return failure(new AppError("User id is not exists!", 400));
        return success(itemGetById);
    };

    /** @todo: processing delete */
    private handleDeleteUser = async (
        id: string
    ): Promise<Either<boolean, AppError>> => {
        await this._userServices.delete(id);
        return success(true);
    };
}
