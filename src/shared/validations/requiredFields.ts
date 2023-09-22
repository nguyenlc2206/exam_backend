import AppError from "src/error-handling/app.error";
import { Validation } from "../functions";

export class RequiredFieldValidation implements Validation {
    constructor(private readonly fieldName: string) {}

    validate(input: any): void | Error {
        if (!input[this.fieldName] || input[this.fieldName].length === 0) {
            return new AppError(`Missing field ${this.fieldName}!`, 400);
        }
    }
}
