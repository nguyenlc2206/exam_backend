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
exports.ChangePasswordController = void 0;
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const bcryptAdapter_1 = require("../../../shared/bcrypt/bcryptAdapter");
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
const validations_1 = require("../../../shared/validations");
const compare_validation_1 = require("../../../shared/validations/compare.validation");
const requiredFields_1 = require("../../../shared/validations/requiredFields");
const env_config_1 = require("../../config/env.config");
/** define change-password controller */
class ChangePasswordController {
    constructor(_userService) {
        this._userService = _userService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: check current password is correct */
            const checkPasswordCorrect = yield this.handleCheckPasswordCorrect(req.body.currentPassword, req.userInfor.password);
            if (checkPasswordCorrect.isFailure())
                return next(checkPasswordCorrect.error);
            if (!checkPasswordCorrect.data)
                return next(new app_error_1.default('Current password is invalid!', 400));
            /** @todo: hash new password */
            const hashPasswordResult = yield this.handleHashPassword(req.body.newPassword);
            if (hashPasswordResult.isFailure())
                return next(hashPasswordResult.error);
            const { data: _hashPassword } = hashPasswordResult;
            /** @todo: change password */
            const changePasswordResult = yield this.handleChangePassword(req.userInfor, _hashPassword);
            if (changePasswordResult.isFailure())
                return next(changePasswordResult.error);
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
            const fields = ['currentPassword', 'newPassword', 'passwordConfirm'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: Compare password **/
            validations.push(new compare_validation_1.CompareFieldsValidation('newPassword', 'passwordConfirm'));
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: check current password is correct */
        this.handleCheckPasswordCorrect = (passwordInformed, hashPasswordUser) => __awaiter(this, void 0, void 0, function* () {
            const { bcryptSalt } = env_config_1.ENV;
            const hasherAdapter = new bcryptAdapter_1.BcryptAdapter(bcryptSalt);
            const result = yield hasherAdapter.compare(passwordInformed, hashPasswordUser);
            return (0, functions_1.success)(result);
        });
        /** @todo: hash new password */
        this.handleHashPassword = (password) => __awaiter(this, void 0, void 0, function* () {
            const { bcryptSalt } = env_config_1.ENV;
            const hasher = new bcryptAdapter_1.BcryptAdapter(bcryptSalt);
            const hashedPassword = yield hasher.hash(password);
            return (0, functions_1.success)(hashedPassword);
        });
        /** @todo: change password */
        this.handleChangePassword = (item, hashPassword) => __awaiter(this, void 0, void 0, function* () {
            const { userId: _id } = item;
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
exports.ChangePasswordController = ChangePasswordController;
