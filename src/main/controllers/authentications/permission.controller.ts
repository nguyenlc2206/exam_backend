import { NextFunction, Request, Response } from "express";
import AppError from "src/error-handling/app.error";
import { HttpRequestUser } from "src/shared/entities/http.entity";

export type RolesType = {
    [index: number]: string;
};

/** define permission roles */
const roleRestrictTo = (roles: RolesType[]) => {
    return async (req: HttpRequestUser, res: Response, next: NextFunction) => {
        if (!roles.includes(req.userInfor.role)) {
            return next(
                new AppError(
                    "You do not have permission to perform this action!",
                    403
                )
            );
        }
        return next();
    };
};

export default roleRestrictTo;
