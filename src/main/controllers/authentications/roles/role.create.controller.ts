import { NextFunction, Request, Response } from 'express';
import { RoleServices } from '~/application/services/roles/roles.services';
import RolesEntity from '~/domain/entities/role.entity';
import AppError from '~/error-handling/app.error';
import catchAsync from '~/shared/catch-async';
import { HttpRequest } from '~/shared/entities/http.entity';
import { Validation, Either, failure, success } from '~/shared/functions';
import { ValidationComposite } from '~/shared/validations';
import { RequiredFieldValidation } from '~/shared/validations/requiredFields';

/** Define create role controller */
export class CreateRoleController {
    constructor(private _roleService: RoleServices<RolesEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation field */
        const validationError = this.handleValidation(req);
        if (validationError) return next(validationError);

        /** @todo: check url role is not exists */
        const checkUrlRoleError = await this.handleCheckUrl(req.body.url);
        if (checkUrlRoleError.isFailure()) return next(checkUrlRoleError.error);

        /** @todo: save url roles to database */
        const newItem = await this.handleCreateRole(req.body);
        if (newItem.isFailure()) return next(newItem.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Insert url to database success',
            data: {
                item: newItem.data
            }
        });
    });

    /** @todo: validation field */
    private handleValidation = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['url'];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }
        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: check url role is not exists */
    private handleCheckUrl = async (url: string): Promise<Either<RolesEntity | undefined, AppError>> => {
        const urlFinded = await this._roleService.getByUrl(url);
        if (urlFinded) return failure(new AppError('Url is already!', 400));
        return success(urlFinded);
    };

    /** @todo: save url roles to database */
    private handleCreateRole = async (item: RolesEntity): Promise<Either<RolesEntity, AppError>> => {
        const newItem = await this._roleService.create(item);
        return success(newItem);
    };
}
