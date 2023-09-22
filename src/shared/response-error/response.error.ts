import { Response } from 'express';
import { ResponseError } from '../entities/error.entity';

/**  send response on env development */
export const sendErrorDev = (err: ResponseError, res: Response) => {
    // console.log(">>>Check error:", err);
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

/**  send response on env productions */
export const sendErrorProd = (err: ResponseError, res: Response) => {
    // console.log(">>>Check error:", err);
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });

        // Programing or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.error('ERROR 💥', err);
        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Somthing went very wrong!'
        });
    }
};
