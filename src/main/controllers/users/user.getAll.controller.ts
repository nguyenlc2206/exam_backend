import { NextFunction, Request, Response } from 'express';
import { UsersServices } from '~/application/services/users/users.services';
import UsersEntity from '~/domain/entities/user.entity';
import AppError from '~/error-handling/app.error';
import catchAsync from '~/shared/catch-async';
import { Either, success } from '~/shared/functions';

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
