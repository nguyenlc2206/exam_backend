"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectRoutesController = void 0;
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
const jwtAdapter_1 = require("../../../shared/jwt/jwtAdapter");
const env_config_1 = require("../../config/env.config");
/** Define protect controller */
class ProtectRoutesController {
    constructor(_userService) {
        this._userService = _userService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: Getting tokken and check of it's there**/
            const getAccessTokenResult = this.handleGetTokenFromHeaders(req);
            if (getAccessTokenResult.isFailure())
                return next(getAccessTokenResult.error);
            const { data: _accessToken } = getAccessTokenResult;
            /** @todo: Verification token **/
            const verifyTokenResult = yield this.handleVerifyToken(_accessToken);
            if (verifyTokenResult.isFailure())
                return next(verifyTokenResult.error);
            const { key: _key, iat: _iat } = verifyTokenResult.data;
            const keyParse = JSON.parse(JSON.stringify(_key));
            /** @todo: Check if user still exists by email **/
            const getUserByEmail = yield this.handleGetUserByEmail(keyParse === null || keyParse === void 0 ? void 0 : keyParse.email);
            if (getUserByEmail.isFailure())
                return next(getUserByEmail.error);
            // get information from data decode
            const { name: roleUser, id: groupId } = getUserByEmail.data.group;
            // get information from data user
            const { email: emailUser, id: userId, passwordChangedAt: _passwordChangedAt, password: _password } = getUserByEmail.data;
            const userInfo = {
                email: emailUser,
                role: roleUser,
                groupId: groupId,
                userId: userId,
                password: _password
            };
            /** @todo: Check if user changed password after the token was issued **/
            const checkPasswordChangedAfter = this.handlePasswordChangedAfter(_iat, _passwordChangedAt);
            if (checkPasswordChangedAfter.isFailure())
                return next(checkPasswordChangedAfter.error);
            req.userInfor = userInfo;
            next();
        }));
        /** @todo: Getting tokken and check of it's there**/
        this.handleGetTokenFromHeaders = (req) => {
            var _a, _b, _c;
            let accessToken;
            if (((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) && ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization.startsWith('Bearer'))) {
                accessToken = (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization.split(' ')[1];
            }
            if (!accessToken)
                return (0, functions_1.failure)(new app_error_1.default('You are not login. Please login to get access!', 401));
            return (0, functions_1.success)(accessToken);
        };
        /** @todo: Verification token **/
        this.handleVerifyToken = (token) => __awaiter(this, void 0, void 0, function* () {
            const { jwtSecret, expiresIn } = env_config_1.ENV;
            const tokenGeneratorAdapter = new jwtAdapter_1.TokenGeneratorAdapter(jwtSecret, expiresIn);
            const decode = yield tokenGeneratorAdapter.decrypt(token);
            return (0, functions_1.success)(decode);
        });
        /** @todo: Check if user still exists by email **/
        this.handleGetUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const userFinded = yield this._userService.getUserByEmail(email, true);
            if (!userFinded)
                return (0, functions_1.failure)(new app_error_1.default('Email is not exists in database!', 400));
            return (0, functions_1.success)(userFinded);
        });
        /** @todo: Check if user changed password after the token was issued **/
        this.handlePasswordChangedAfter = (timeDecode, passwordChangedAt) => {
            const numberChangeAt = passwordChangedAt.getTime();
            const changedTimestamp = parseInt((numberChangeAt / 1000).toString(), 10);
            if (timeDecode < changedTimestamp)
                return (0, functions_1.failure)(new app_error_1.default('User recently change password! Please login again.', 401));
            return (0, functions_1.success)(false);
        };
    }
}
exports.ProtectRoutesController = ProtectRoutesController;
