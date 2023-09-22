"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldValidation = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
class RequiredFieldValidation {
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        if (!input[this.fieldName] || input[this.fieldName].length === 0) {
            return new app_error_1.default(`Missing field ${this.fieldName}!`, 400);
        }
    }
}
exports.RequiredFieldValidation = RequiredFieldValidation;
