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
exports.GetTempoTokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
const validations_1 = require("../../../shared/validations");
const email_validation_1 = require("../../../shared/validations/email.validation");
const requiredFields_1 = require("../../../shared/validations/requiredFields");
/** Define get tempo token controller */
class GetTempoTokenController {
    constructor(_userService) {
        this._userService = _userService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: get account from collection by email */
            const getUserByEmailResult = yield this.handleGetUserByEmail(req.body.email);
            if (getUserByEmailResult.isFailure())
                return next(getUserByEmailResult.error);
            /** @todo: generate temporary token */
            const generateTempoTokenResult = yield this.handleGenerateTempoToken(getUserByEmailResult.data);
            if (generateTempoTokenResult.isFailure())
                return next(generateTempoTokenResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: `Get temporary token with email ${req.body.email} success`,
                data: {
                    tempoToken: generateTempoTokenResult.data
                }
            });
        }));
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['email'];
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
        /** @todo: get account from collection by email */
        this.handleGetUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const userFinded = yield this._userService.getUserByEmail(email);
            if (!userFinded)
                return (0, functions_1.failure)(new app_error_1.default('Email is not exists in database!', 400));
            return (0, functions_1.success)(userFinded);
        });
        /** @todo: generate temporary token */
        this.handleGenerateTempoToken = (user) => __awaiter(this, void 0, void 0, function* () {
            // process update tempoTokenExpires to databse
            const { id: _id } = user;
            const _itemUpdate = {
                id: _id,
                email: user === null || user === void 0 ? void 0 : user.email
            };
            const tempoToken = jsonwebtoken_1.default.sign({
                data: _itemUpdate
            }, 'HS256', { expiresIn: '10m' });
            return (0, functions_1.success)(tempoToken);
        });
    }
}
exports.GetTempoTokenController = GetTempoTokenController;
