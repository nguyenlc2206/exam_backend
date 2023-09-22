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
exports.ForgotPasswordController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const bcryptAdapter_1 = require("../../../shared/bcrypt/bcryptAdapter");
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
const validations_1 = require("../../../shared/validations");
const compare_validation_1 = require("../../../shared/validations/compare.validation");
const email_validation_1 = require("../../../shared/validations/email.validation");
const requiredFields_1 = require("../../../shared/validations/requiredFields");
const env_config_1 = require("../../config/env.config");
/** define forgot password controller */
class ForgotPasswordController {
    constructor(_userService) {
        this._userService = _userService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: validation field headers */
            const getAccessTokenResult = this.handleGetTokenFromHeaders(req);
            if (getAccessTokenResult.isFailure())
                return next(getAccessTokenResult.error);
            const { data: _tempoToken } = getAccessTokenResult;
            /** @todo: get account from collection by email */
            const getUserByEmailResult = yield this.handleGetUserByEmail(req.body.email);
            if (getUserByEmailResult.isFailure())
                return next(getUserByEmailResult.error);
            /** @todo: verify token expires */
            const verifyTempToken = yield this.handleVerifyTempoToken(_tempoToken);
            if (verifyTempToken.isFailure())
                return next(verifyTempToken.error);
            /** @todo: hash password */
            const hashPasswordResult = yield this.handleHashPassword(req.body.password);
            if (hashPasswordResult.isFailure())
                return next(hashPasswordResult.error);
            const { data: _hashPassword } = hashPasswordResult;
            /** @todo: update password */
            const updatePasswordResult = yield this.handleUpdatePassword(getUserByEmailResult.data, _hashPassword);
            if (updatePasswordResult.isFailure())
                return next(updatePasswordResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: `Change password with email ${req.body.email} success`,
                data: {}
            });
        }));
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['email', 'password', 'passwordConfirm'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: Compare password **/
            validations.push(new compare_validation_1.CompareFieldsValidation('password', 'passwordConfirm'));
            /** @todo: Validate Email **/
            const emailValidatorAdapter = new email_validation_1.EmailValidatorAdapter();
            validations.push(new email_validation_1.EmailValidation('email', emailValidatorAdapter));
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: validation field headers */
        this.handleGetTokenFromHeaders = (req) => {
            var _a, _b, _c;
            let tempoToken;
            if (((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) && ((_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization.startsWith('Bearer'))) {
                tempoToken = (_c = req.headers) === null || _c === void 0 ? void 0 : _c.authorization.split(' ')[1];
            }
            if (!tempoToken)
                return (0, functions_1.failure)(new app_error_1.default('You are not login. Please login to get access!', 401));
            return (0, functions_1.success)(tempoToken);
        };
        /** @todo: get account from collection by email */
        this.handleGetUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const userFinded = yield this._userService.getUserByEmail(email);
            if (!userFinded)
                return (0, functions_1.failure)(new app_error_1.default('Email is not exists in database!', 400));
            return (0, functions_1.success)(userFinded);
        });
        /** @todo: verify token expires */
        this.handleVerifyTempoToken = (tempoToken) => __awaiter(this, void 0, void 0, function* () {
            const decode = jsonwebtoken_1.default.verify(tempoToken, 'HS256');
            console.log('>>>Check decode:', decode);
            return (0, functions_1.success)(true);
        });
        /** @todo: hash password */
        this.handleHashPassword = (password) => __awaiter(this, void 0, void 0, function* () {
            const { bcryptSalt } = env_config_1.ENV;
            const hasher = new bcryptAdapter_1.BcryptAdapter(bcryptSalt);
            const hashedPassword = yield hasher.hash(password);
            return (0, functions_1.success)(hashedPassword);
        });
        /** @todo: update password */
        this.handleUpdatePassword = (item, hashPassword) => __awaiter(this, void 0, void 0, function* () {
            const { id: _id } = item;
            const _itemUpdate = {
                id: _id,
                password: hashPassword,
                passwordChangedAt: new Date(Date.now())
            };
            const itemUpdate = yield this._userService.update(_itemUpdate);
            return (0, functions_1.success)(itemUpdate);
        });
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
