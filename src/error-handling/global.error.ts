import { NextFunction, Request, Response } from 'express';
import { ResponseError } from '@src/shared/entities/error.entity';
import { sendErrorDev, sendErrorProd } from '@src/shared/response-error/index';
import AppError from '@src/error-handling/app.error';

/** Define global error reponse for app */
export const globalErrorConfig = (error: ResponseError, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    //check envirement for response
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(error, res);
    } else if (process.env.NODE_ENV === 'production') {
        if (error.name === 'JsonWebTokenError') {
            error.message = 'Invalid token. Please login again!';
            error.statusCode = 402;
        }
        if (error.name === 'TokenExpiredError') {
            error.message = 'Your token has expired. Please login again!';
            error.statusCode = 402;
        }
        sendErrorProd(error, res);
    }
};
