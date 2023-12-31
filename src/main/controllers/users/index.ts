import { UsersServices } from '@src/application/services/users/users.services';
import UsersEntity from '@src/domain/entities/user.entity';
import { NextFunction, Request, Response } from 'express';
import { CreateUserController } from '@src/main/controllers/users/user.create.controller';
import { DeleteUserController } from '@src/main/controllers/users/user.delete.controller';
import { GetAllUsersController } from '@src/main/controllers/users/user.getAll.controller';
import { CheckUserController } from '@src/main/controllers/users/user.check.controller';

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

    /** checkUser user */
    checkUser = async (req: Request, res: Response, next: NextFunction) => {
        const checkUser = new CheckUserController(this.service);
        return checkUser.execute(req, res, next);
    };
}
