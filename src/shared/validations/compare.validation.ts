import AppError from "@src/error-handling/app.error";
import { Validation } from "../functions";

export class CompareFieldsValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly fieldToCompare: string
    ) {}

    validate<T extends Record<string, string>>(input: T): void | Error {
        if (
            input[this.fieldName].length !== input[this.fieldToCompare].length
        ) {
            return new AppError(
                `Length is not same ${this.fieldToCompare}!`,
                400
            );
        }
        if (input[this.fieldName] !== input[this.fieldToCompare]) {
            return new AppError(
                `Content is not same ${this.fieldToCompare}!`,
                400
            );
        }
    }
}
