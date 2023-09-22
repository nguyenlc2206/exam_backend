"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidation = exports.EmailValidatorAdapter = void 0;
const validator_1 = __importDefault(require("validator"));
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
class EmailValidatorAdapter {
    isValid(email) {
        return validator_1.default.isEmail(email);
    }
}
exports.EmailValidatorAdapter = EmailValidatorAdapter;
class EmailValidation {
    constructor(fieldName, emailValidator) {
        this.fieldName = fieldName;
        this.emailValidator = emailValidator;
    }
    validate(input) {
        const isValidEmail = this.emailValidator.isValid(input[this.fieldName]);
        if (!isValidEmail) {
            return new app_error_1.default(`Something wrong from ${this.fieldName}!`, 400);
        }
    }
}
exports.EmailValidation = EmailValidation;
