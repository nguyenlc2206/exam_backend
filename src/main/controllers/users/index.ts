import { NextFunction, Request, Response } from 'express';
import { UsersServices } from '~/application/services/users/users.services';
import UsersEntity from '~/domain/entities/user.entity';
import { CreateUserController } from './user.create.controller';
import { DeleteUserController } from './user.delete.controller';
import { GetAllUsersController } from './user.getAll.controller';

/** Define users controller */
export class UsersController {
    private service: UsersServices<UsersEntity>;

    constructor(service: UsersServices<UsersEntity>) {
        this.service = service;
    }

    /** create user */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createUser = new CreateUserController(this.service);
        return createUser.execute(req, res, next);
    };

    /** get all users */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const getAllUsers = new GetAllUsersController(this.service);
        return getAllUsers.execute(req, res, next);
    };

    /** delete user */
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const deleteUser = new DeleteUserController(this.service);
        return deleteUser.execute(req, res, next);
    };
}
