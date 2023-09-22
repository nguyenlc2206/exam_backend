import { NextFunction, Request, Response } from "express";
import { ResponseError } from "src/shared/entities";
import { sendErrorDev, sendErrorProd } from "src/shared/response-error";

/** Define global error reponse for app */
export const globalErrorConfig = (
    error: ResponseError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";

    //check envirement for response
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(error, res);
    } else if (process.env.NODE_ENV === "production") {
        sendErrorProd(error, res);
    }
};
