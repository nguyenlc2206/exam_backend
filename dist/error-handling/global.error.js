"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorConfig = void 0;
const response_error_1 = require("../shared/response-error");
/** Define global error reponse for app */
const globalErrorConfig = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    //check envirement for response
    if (process.env.NODE_ENV === 'development') {
        (0, response_error_1.sendErrorDev)(error, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        (0, response_error_1.sendErrorProd)(error, res);
    }
};
exports.globalErrorConfig = globalErrorConfig;
