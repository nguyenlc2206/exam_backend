import { NextFunction, Request, Response } from 'express'
import { GroupsServices } from 'src/application/services/groups/groups.services'
import GroupsEntity from 'src/domain/entities/group.entity'
import AppError from 'src/error-handling/app.error'
import catchAsync from 'src/shared/catch-async'
import { HttpRequest } from 'src/shared/entities/http.entity'
import { Either, Validation, failure, success } from 'src/shared/functions'
import { ValidationComposite } from 'src/shared/validations'
import { RequiredFieldValidation } from 'src/shared/validations/requiredFields'

/** define create groups controller */
export class CreateGroupController {
    constructor(private _groupsServices: GroupsServices<GroupsEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation field */
        const validationError = this.handleValidation(req)
        if (validationError) return next(validationError)

        /** @todo: check name groups is not exists */
        const checkNameGroupError = await this.handleCheckName(req.body.name)
        if (checkNameGroupError.isFailure()) return next(checkNameGroupError.error)

        /** @todo: save name groups to database */
        const newItem = await this.handleCreateGroup(req.body)
        if (newItem.isFailure()) return next(newItem.error)

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Insert name goup database success',
            data: {
                item: newItem.data
            }
        })
    })

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body

        const validations: Validation[] = []
        const fields = ['name']

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field))
        }
        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations)

        return validationComposite.validate(body)
    }

    /** @todo: check name groups is not exists */
    private handleCheckName = async (name: string): Promise<Either<GroupsEntity | undefined, AppError>> => {
        const urlFinded = await this._groupsServices.getByName(name)
        if (urlFinded) return failure(new AppError(`Name ${name} is already!`, 400))
        return success(urlFinded)
    }

    /** @todo: save name groups to database */
    private handleCreateGroup = async (item: GroupsEntity): Promise<Either<GroupsEntity, AppError>> => {
        const newItem = await this._groupsServices.create(item)
        return success(newItem)
    }
}
