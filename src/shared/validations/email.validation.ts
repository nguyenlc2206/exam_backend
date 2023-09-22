import validator from 'validator';
import AppError from '~/error-handling/app.error';
import { Validation } from '../functions';

export interface EmailValidator {
    isValid: (email: string) => boolean;
}

export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        return validator.isEmail(email);
    }
}

export class EmailValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator
    ) {}

    validate<T extends Record<string, string>>(input: T): void | Error {
        const isValidEmail = this.emailValidator.isValid(input[this.fieldName]);
        if (!isValidEmail) {
            return new AppError(`Something wrong from ${this.fieldName}!`, 400);
        }
    }
}
