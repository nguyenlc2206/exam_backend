"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorProd = exports.sendErrorDev = void 0;
/**  send response on env development */
const sendErrorDev = (err, res) => {
    // console.log(">>>Check error:", err);
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};
exports.sendErrorDev = sendErrorDev;
/**  send response on env productions */
const sendErrorProd = (err, res) => {
    // console.log(">>>Check error:", err);
    // Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
        // Programing or other unknown error: don't leak error details
    }
    else {
        // 1) Log error
        console.error('ERROR 💥', err);
        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Somthing went very wrong!'
        });
    }
};
exports.sendErrorProd = sendErrorProd;
