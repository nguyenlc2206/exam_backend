"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CreateUserController = void 0;
const _ = __importStar(require("lodash"));
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const bcryptAdapter_1 = require("../../../shared/bcrypt/bcryptAdapter");
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
const validations_1 = require("../../../shared/validations");
const compare_validation_1 = require("../../../shared/validations/compare.validation");
const email_validation_1 = require("../../../shared/validations/email.validation");
const requiredFields_1 = require("../../../shared/validations/requiredFields");
const env_config_1 = require("../../config/env.config");
/** Define create user controller */
class CreateUserController {
    constructor(_userService) {
        this._userService = _userService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: check email exists */
            const checkEmailResult = yield this.hanleCheckEmailExists(req.body.email);
            if (checkEmailResult.isFailure())
                return next(checkEmailResult.error);
            /** @todo: check deletedAt not null */
            if ((_a = checkEmailResult.data) === null || _a === void 0 ? void 0 : _a.deletedAt) {
                /** @todo: restore user to database */
                const restoreResult = yield this.handleRestoreUser(checkEmailResult.data.id);
                if (restoreResult.isFailure())
                    return next(restoreResult.error);
                /** @todo: processing reponse */
                return res.status(200).json({
                    status: 'success',
                    message: `Restore user with email ${checkEmailResult.data.email} success`,
                    data: {}
                });
            }
            /** @todo: hash password */
            const hashPasswordResult = yield this.handleHashPassword(req.body.password);
            if (hashPasswordResult.isFailure())
                return next(hashPasswordResult.error);
            const { data: _hashPassword } = hashPasswordResult;
            /** @todo: save user to database */
            const _cloneUser = _.cloneDeep(req.body);
            const _userCreate = Object.assign(Object.assign({}, _cloneUser), { password: _hashPassword });
            const newUser = yield this.handleCreateUser(_userCreate);
            if (newUser.isFailure())
                return next(newUser.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Insert user to database success',
                data: {
                    user: _.omit(newUser.data, ['password', 'passwordConfirm'])
                }
            });
        }));
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['phoneNumber', 'email', 'password', 'passwordConfirm'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: Compare password **/
            validations.push(new compare_validation_1.CompareFieldsValidation('password', 'passwordConfirm'));
            /** @todo: Validate Email **/
            const emailValidatorAdapter = new email_validation_1.EmailValidatorAdapter();
            validations.push(new email_validation_1.EmailValidation('email', emailValidatorAdapter));
            /** @todo: validation phone --> update in future */
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: check email exists */
        this.hanleCheckEmailExists = (email) => __awaiter(this, void 0, void 0, function* () {
            const userFinded = yield this._userService.getUserByEmail(email);
            if (userFinded && !(userFinded === null || userFinded === void 0 ? void 0 : userFinded.deletedAt))
                return (0, functions_1.failure)(new app_error_1.default('Email is already in database!', 400));
            return (0, functions_1.success)(userFinded);
        });
        /** @todo: hash password */
        this.handleHashPassword = (password) => __awaiter(this, void 0, void 0, function* () {
            const { bcryptSalt } = env_config_1.ENV;
            const hasher = new bcryptAdapter_1.BcryptAdapter(bcryptSalt);
            const hashedPassword = yield hasher.hash(password);
            return (0, functions_1.success)(hashedPassword);
        });
        /** @todo: save user to database */
        this.handleCreateUser = (item) => __awaiter(this, void 0, void 0, function* () {
            const newItem = yield this._userService.create(item);
            return (0, functions_1.success)(newItem);
        });
        /** @todo: restore user to database */
        this.handleRestoreUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const itemRestore = yield this._userService.restore(id);
            return (0, functions_1.success)(itemRestore);
        });
    }
}
exports.CreateUserController = CreateUserController;
