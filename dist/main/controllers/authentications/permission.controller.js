"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
/** define permission roles */
const roleRestrictTo = (roles) => {
    return async (req, res, next) => {
        if (!roles.includes(req.userInfor.role)) {
            return next(new app_error_1.default('You do not have permission to perform this action!', 403));
        }
        return next();
    };
};
exports.default = roleRestrictTo;
