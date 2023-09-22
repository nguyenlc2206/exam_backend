import { NextFunction, Request, Response } from "express";
import { RoleServices } from "src/application/services/roles/roles.services";
import RolesEntity from "src/domain/entities/role.entity";
import AppError from "src/error-handling/app.error";
import catchAsync from "src/shared/catch-async";
import { Either, failure, success } from "src/shared/functions";

/** Define role delete controller */
export class DeleteRoleController {
    constructor(private _roleServices: RoleServices<RolesEntity>) {}

    /** define execute function */
    execute = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            /** @todo: check id is exists in database */
            const checkIdError = await this.handleCheckIdExists(req.params.id);
            if (checkIdError.isFailure()) return next(checkIdError.error);

            /** @todo: processing delete */

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: "Delete role is success",
                data: {},
            });
        }
    );

    /** @todo: check id is exists in database */
    private handleCheckIdExists = async (
        id: string
    ): Promise<Either<RolesEntity, AppError>> => {
        const itemGetById = await this._roleServices.getById(id);
        if (!itemGetById)
            return failure(new AppError("Id is not exists!", 400));
        return success(itemGetById);
    };
}
