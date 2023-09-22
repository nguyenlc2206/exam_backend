"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompareFieldsValidation = void 0;
const app_error_1 = __importDefault(require("../../error-handling/app.error"));
class CompareFieldsValidation {
    constructor(fieldName, fieldToCompare) {
        this.fieldName = fieldName;
        this.fieldToCompare = fieldToCompare;
    }
    validate(input) {
        if (input[this.fieldName].length !== input[this.fieldToCompare].length) {
            return new app_error_1.default(`Length is not same ${this.fieldToCompare}!`, 400);
        }
        if (input[this.fieldName] !== input[this.fieldToCompare]) {
            return new app_error_1.default(`Content is not same ${this.fieldToCompare}!`, 400);
        }
    }
}
exports.CompareFieldsValidation = CompareFieldsValidation;
