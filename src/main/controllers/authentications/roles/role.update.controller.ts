import { NextFunction, Request, Response } from "express";
import * as _ from "lodash";

import catchAsync from "@src/shared/catch-async";
import RolesEntity from "@src/domain/entities/role.entity";
import { RoleServices } from "@src/application/services/roles/roles.services";
import { HttpRequest } from "@src/shared/entities/http.entity";
import { Either, Validation, failure, success } from "@src/shared/functions";
import { RequiredFieldValidation } from "@src/shared/validations/requiredFields";
import { ValidationComposite } from "@src/shared/validations";
import AppError from "@src/error-handling/app.error";

/** Define update role controller */
export class UpdateRoleController {
    constructor(private _roleService: RoleServices<RolesEntity>) {}

    /** define execute function */
    execute = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            /** @todo: validation fields */
            const validationsError = this.handleValidations(req);
            if (validationsError) return next(validationsError);

            /** @todo: check id, url */
            const checkIdError = await this.handleGetRoleById(req.body.id);
            if (checkIdError.isFailure()) return next(checkIdError.error);
            // console.log(">>>Check checkIdError:", checkIdError.data);

            /** @todo: process update role */
            const { id: _id, url: _url } = checkIdError.data as RolesEntity;
            if (_url === req.body.url)
                return next(new AppError("Url is same with current url!", 400));

            const _itemUpdate = await this.handleUpdateRole(
                checkIdError.data as RolesEntity,
                req.body.url
            );
            if (_itemUpdate.isFailure()) return next(_itemUpdate.error);

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: "Update url to database success",
                data: {
                    item: _itemUpdate.data,
                },
            });
        }
    );

    /** @todo: validation fields */
    private handleValidations = (request: HttpRequest) => {
        /** get information */
        const body = request.body;

        const validations: Validation[] = [];
        const fields = ["id", "url"];

        /** @todo: Validate field requires **/
        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }
        /** @todo: init validationComposite **/
        const validationComposite = new ValidationComposite(validations);

        return validationComposite.validate(body);
    };

    /** @todo: get information role by id */
    private handleGetRoleById = async (
        id: string
    ): Promise<Either<RolesEntity, AppError>> => {
        const itemGet = await this._roleService.getById(id);
        if (!itemGet) return failure(new AppError("Id role not exists!", 400));
        return success(itemGet);
    };

    /** @todo: process update role */
    private handleUpdateRole = async (
        item: RolesEntity,
        url: string
    ): Promise<Either<RolesEntity, AppError>> => {
        const _cloneItem = _.cloneDeep(item);
        const _itemUpdate = {
            ..._cloneItem,
            url: url,
            updatedAt: new Date(Date.now()),
        };
        const itemUpdate = await this._roleService.update(_itemUpdate);
        return success(itemUpdate);
    };
}
