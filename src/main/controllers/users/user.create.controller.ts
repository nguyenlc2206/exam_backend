import { NextFunction, Request, Response } from 'express'
import * as _ from 'lodash'
import { UsersServices } from 'src/application/services/users/users.services'
import UsersEntity from 'src/domain/entities/user.entity'
import AppError from 'src/error-handling/app.error'
import { ENV } from 'src/main/config/env.config'
import { BcryptAdapter } from 'src/shared/bcrypt/bcryptAdapter'
import catchAsync from 'src/shared/catch-async'
import { HttpRequest } from 'src/shared/entities/http.entity'
import { Either, Validation, failure, success } from 'src/shared/functions'
import { ValidationComposite } from 'src/shared/validations'
import { CompareFieldsValidation } from 'src/shared/validations/compare.validation'
import { EmailValidation, EmailValidatorAdapter } from 'src/shared/validations/email.validation'
import { RequiredFieldValidation } from 'src/shared/validations/requiredFields'

/** Define create user controller */
export class CreateUserController {
    constructor(private _userService: UsersServices<UsersEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation field */
        const validationError = this.handleValidation(req)
        if (validationError) return next(validationError)

        /** @todo: check email exists */
        const checkEmailResult = await this.hanleCheckEmailExists(req.body.email)
        if (checkEmailResult.isFailure()) return next(checkEmailResult.error)

        /** @todo: check deletedAt not null */
        if (checkEmailResult.data?.deletedAt) {
            /** @todo: restore user to database */
            const restoreResult = await this.handleRestoreUser(checkEmailResult.data.id)
            if (restoreResult.isFailure()) return next(restoreResult.error)

            /** @todo: processing reponse */
            return res.status(200).json({
                status: 'success',
                message: `Restore user with email ${checkEmailResult.data.email} success`,
                data: {}
            })
        }

        /** @todo: hash password */
        const hashPasswordResult = await this.handleHashPassword(req.body.password)
        if (hashPasswordResult.isFailure()) return next(hashPasswordResult.error)
        const { data: _hashPassword } = hashPasswordResult

        /** @todo: save user to database */
        const _cloneUser = _.cloneDeep(req.body)
        const _userCreate = { ..._cloneUser, password: _hashPassword }
        const newUser = await this.handleCreateUser(_userCreate)
        if (newUser.isFailure()) return next(newUser.error)

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Insert user to database success',
            data: {
                user: _.omit(newUser.data, ['password', 'passwordConfirm'])
            }
        })
    })

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body

        const validations: Validation[] = []
        const fields = ['phoneNumber', 'email', 'password', 'passwordConfirm']

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field))
        }
        /** @todo: Compare password **/
        validations.push(new CompareFieldsValidation('password', 'passwordConfirm'))

        /** @todo: Validate Email **/
        const emailValidatorAdapter = new EmailValidatorAdapter()
        validations.push(new EmailValidation('email', emailValidatorAdapter))

        /** @todo: validation phone --> update in future */

        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations)

        return validationComposite.validate(body)
    }

    /** @todo: check email exists */
    private hanleCheckEmailExists = async (email: string): Promise<Either<UsersEntity | undefined, AppError>> => {
        const userFinded = await this._userService.getUserByEmail(email)
        if (userFinded && !userFinded?.deletedAt) return failure(new AppError('Email is already in database!', 400))
        return success(userFinded)
    }

    /** @todo: hash password */
    private handleHashPassword = async (password: string): Promise<Either<string, AppError>> => {
        const { bcryptSalt } = ENV
        const hasher = new BcryptAdapter(bcryptSalt)
        const hashedPassword = await hasher.hash(password)
        return success(hashedPassword)
    }

    /** @todo: save user to database */
    private handleCreateUser = async (item: UsersEntity): Promise<Either<UsersEntity, AppError>> => {
        const newItem = await this._userService.create(item)
        return success(newItem)
    }

    /** @todo: restore user to database */
    private handleRestoreUser = async (id: string): Promise<Either<any, AppError>> => {
        const itemRestore = await this._userService.restore(id)
        return success(itemRestore)
    }
}
