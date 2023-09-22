import { UsersServices } from '@src/application/services/users/users.services';
import UsersEntity from '@src/domain/entities/user.entity';
import AppError from '@src/error-handling/app.error';
import catchAsync from '@src/shared/catch-async';
import { Either, success } from '@src/shared/functions';
import { NextFunction, Request, Response } from 'express';

/** Define role getAll controller */
export class GetAllUsersController {
    constructor(private _userService: UsersServices<UsersEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: processing get all users */
        const getAllUsersResult = await this.handleGetAllUsers();
        if (getAllUsersResult.isFailure()) return next(getAllUsersResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Get list users success',
            data: {
                items: getAllUsersResult.data
            }
        });
    });

    /** @todo: processing get all users */
    private handleGetAllUsers = async (): Promise<Either<UsersEntity[], AppError>> => {
        const listUsers = await this._userService.getAll();
        return success(listUsers);
    };
}
