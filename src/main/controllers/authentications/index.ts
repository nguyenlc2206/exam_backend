import { UsersServices } from "@src/application/services/users/users.services";
import UsersEntity from "@src/domain/entities/user.entity";
import { NextFunction, Request, Response } from "express";
import { LoginCotroller } from "./login.controller";
import { ProtectRoutesController } from "./protect.controller";
import { ChangePasswordController } from "./changePassword.controller";
import { GetTempoTokenController } from "./getTempoToken.controller";
import { ForgotPasswordController } from "./forgotPassword.controller";
import { RefreshTokenController } from "./refreshToken.controller";

/** Define auth controller */
export class AuthenticationsController {
    private service: UsersServices<UsersEntity>;

    constructor(service: UsersServices<UsersEntity>) {
        this.service = service;
    }

    /** create user */
    login = async (req: Request, res: Response, next: NextFunction) => {
        const login = new LoginCotroller(this.service);
        return login.execute(req, res, next);
    };

    /** protect routes */
    protect = async (req: Request, res: Response, next: NextFunction) => {
        const protect = new ProtectRoutesController(this.service);
        return protect.execute(req, res, next);
    };

    /** change password */
    changePassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const changePassword = new ChangePasswordController(this.service);
        return changePassword.execute(req, res, next);
    };

    /** get tempoToken */
    getTempToken = async (req: Request, res: Response, next: NextFunction) => {
        const getTempoToken = new GetTempoTokenController(this.service);
        return getTempoToken.execute(req, res, next);
    };

    /** forgot password */
    forgotPassword = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const forgotPassword = new ForgotPasswordController(this.service);
        return forgotPassword.execute(req, res, next);
    };

    /** processing refreshToken */
    refreshToken = async (req: Request, res: Response, next: NextFunction) => {
        const refreshToken = new RefreshTokenController();
        return refreshToken.execute(req, res, next);
    };
}
