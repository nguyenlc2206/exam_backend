import { NextFunction, Request, Response } from 'express';
import * as _ from 'lodash';
import { GroupsServices } from '../../../../application/services/groups/groups.services';
import GroupsEntity from '../../../../domain/entities/group.entity';
import AppError from '../../../../error-handling/app.error';
import catchAsync from '../../../../shared/catch-async';
import { HttpRequest } from '../../../../shared/entities/http.entity';
import { Validation, Either, failure, success } from '../../../../shared/functions';
import { ValidationComposite } from '../../../../shared/validations';
import { RequiredFieldValidation } from '../../../../shared/validations/requiredFields';

/** Define update group controller */
export class UpdateGroupController {
    constructor(private _groupsServices: GroupsServices<GroupsEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: validation fields */
        const validationsError = this.handleValidations(req);
        if (validationsError) return next(validationsError);

        /** @todo: check id, name */
        const checkIdError = await this.handleGetGroupById(req.body.id);
        if (checkIdError.isFailure()) return next(checkIdError.error);

        /** @todo: process update group */
        const { id: _id, name: _name } = checkIdError.data as GroupsEntity;
        if (_name === req.body.name) return next(new AppError('Name is same with current Name!', 400));

        const _itemUpdate = await this.handleUpdateRole(checkIdError.data as GroupsEntity, req.body.name);
        if (_itemUpdate.isFailure()) return next(_itemUpdate.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Update name to database success',
            data: {
                item: _itemUpdate.data
            }
        });
    });

    /** @todo: validation fields */
    private handleValidations = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ['id', 'name'];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }
        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: get information group by id */
    private handleGetGroupById = async (id: number): Promise<Either<GroupsEntity, AppError>> => {
        const itemGet = await this._groupsServices.getById(id);
        if (!itemGet) return failure(new AppError('Id role not exists!', 400));
        return success(itemGet);
    };

    /** @todo: process update group */
    private handleUpdateRole = async (item: GroupsEntity, name: string): Promise<Either<GroupsEntity, AppError>> => {
        const _cloneItem = _.cloneDeep(item);
        const _itemUpdate = {
            ..._cloneItem,
            name: name,
            updatedAt: new Date(Date.now())
        };
        const itemUpdate = await this._groupsServices.update(_itemUpdate);
        return success(itemUpdate);
    };
}
