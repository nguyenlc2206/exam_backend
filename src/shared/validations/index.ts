import { Validation } from '../functions'

export class ValidationComposite implements Validation {
    constructor(private readonly validations: Validation[]) {}

    validate(input: any): void | Error {
        // console.log('>>>Check validations:', this.validations);
        for (const validation of this.validations) {
            const error = validation.validate(input)
            if (error) return error
        }
    }
}
