import { NextFunction, Request, Response } from "express";
import { RoleServices } from "src/application/services/roles/roles.services";
import RolesEntity from "src/domain/entities/role.entity";
import AppError from "src/error-handling/app.error";
import catchAsync from "src/shared/catch-async";
import { Either, success } from "src/shared/functions";

/** Define role getAll controller */
export class GetAllRoleController {
    constructor(private _roleService: RoleServices<RolesEntity>) {}

    /** define execute function */
    execute = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            /** @todo: processing get all roles */
            const getAllRolesResult = await this.handleGetAllRoles();
            if (getAllRolesResult.isFailure())
                return next(getAllRolesResult.error);

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: "Get list role success",
                data: {
                    items: getAllRolesResult.data,
                },
            });
        }
    );

    /** @todo: processing get all roles */
    private handleGetAllRoles = async (): Promise<
        Either<RolesEntity[], AppError>
    > => {
        const listRoles = await this._roleService.getAll();
        return success(listRoles);
    };
}
