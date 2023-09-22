"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginCotroller = void 0;
const uuid_1 = require("uuid");
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const env_config_1 = require("~/main/config/env.config");
const bcryptAdapter_1 = require("~/shared/bcrypt/bcryptAdapter");
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
const jwtAdapter_1 = require("~/shared/jwt/jwtAdapter");
const validations_1 = require("~/shared/validations");
const email_validation_1 = require("~/shared/validations/email.validation");
const requiredFields_1 = require("~/shared/validations/requiredFields");
/** Define login controller */
class LoginCotroller {
    constructor(_userService) {
        this._userService = _userService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: get user by email */
            const getUserByEmailResult = await this.handleGetUserByEmail(req.body.email);
            if (getUserByEmailResult.isFailure())
                return next(getUserByEmailResult.error);
            /** @todo: compare password */
            const { password: _hashPassword } = getUserByEmailResult.data;
            const comparePasswordResult = await this.handleComparePassword(req.body.password, _hashPassword);
            if (comparePasswordResult.isFailure())
                return next(comparePasswordResult.error);
            if (!comparePasswordResult.data)
                return next(new app_error_1.default('Password is wrong!', 400));
            /** @todo: generate token by email and id */
            const generateTokenResult = await this.handleGenerateToken(getUserByEmailResult.data);
            if (generateTokenResult.isFailure())
                return next(generateTokenResult.error);
            const { data: _token } = generateTokenResult;
            /** @todo: generate refresh token by email and id */
            const generateRefreshTokenResult = await this.handleGenerateRefreshToken(getUserByEmailResult.data);
            if (generateRefreshTokenResult.isFailure())
                return next(generateRefreshTokenResult.error);
            const { data: refreshToken } = generateRefreshTokenResult;
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: `Login with email ${req.body.email} success`,
                data: {
                    accessToken: _token,
                    refreshToken: refreshToken
                }
            });
        });
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['email', 'password'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            /** @todo: Validate Email **/
            const emailValidatorAdapter = new email_validation_1.EmailValidatorAdapter();
            validations.push(new email_validation_1.EmailValidation('email', emailValidatorAdapter));
            return validationComposite.validate(body);
        };
        /** @todo: get user by email */
        this.handleGetUserByEmail = async (email) => {
            const userFinded = await this._userService.getUserByEmail(email);
            if (!userFinded)
                return (0, functions_1.failure)(new app_error_1.default('Email is not exists in database!', 400));
            return (0, functions_1.success)(userFinded);
        };
        /** @todo: compare password */
        this.handleComparePassword = async (passwordInformed, hashPasswordUser) => {
            const { bcryptSalt } = env_config_1.ENV;
            const hasherAdapter = new bcryptAdapter_1.BcryptAdapter(bcryptSalt);
            const result = await hasherAdapter.compare(passwordInformed, hashPasswordUser);
            return (0, functions_1.success)(result);
        };
        /** @todo: generate token by email and id */
        this.handleGenerateToken = async (user) => {
            const { jwtSecret, expiresIn } = env_config_1.ENV;
            const tokenGeneratorAdapter = new jwtAdapter_1.TokenGeneratorAdapter(jwtSecret, expiresIn);
            const _key = { email: user.email, id: user.id };
            const token = await tokenGeneratorAdapter.generate(_key);
            return (0, functions_1.success)(token);
        };
        /** @todo: generate refresh token by email and id */
        this.handleGenerateRefreshToken = async (user) => {
            const { jwtSecret } = env_config_1.ENV;
            const tokenGeneratorAdapter = new jwtAdapter_1.TokenGeneratorAdapter(jwtSecret, '30d');
            const _key = { email: user.email, id: user.id, uuid: (0, uuid_1.v4)() };
            const refreshToken = await tokenGeneratorAdapter.generate(_key);
            return (0, functions_1.success)(refreshToken);
        };
    }
}
exports.LoginCotroller = LoginCotroller;
