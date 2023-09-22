import { NextFunction, Request, Response } from "express";
import { GroupsServices } from "src/application/services/groups/groups.services";
import GroupsEntity from "src/domain/entities/group.entity";
import AppError from "src/error-handling/app.error";
import catchAsync from "src/shared/catch-async";
import { Either, success } from "src/shared/functions";

/** Define getAll Groups Controller */
export class GetAllGroupsController {
    constructor(private _groupsServices: GroupsServices<GroupsEntity>) {}

    /** define execute function */
    execute = catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            /** @todo: processing get all groups */
            const getAllGroupsResult = await this.handleGetAllGroups();
            if (getAllGroupsResult.isFailure())
                return next(getAllGroupsResult.error);

            /** @todo: processing reponse */
            res.status(200).json({
                status: "success",
                message: "Get list groups success",
                data: {
                    items: getAllGroupsResult.data,
                },
            });
        }
    );

    /** @todo: processing get all groups */
    private handleGetAllGroups = async (): Promise<
        Either<GroupsEntity[], AppError>
    > => {
        const listRoles = await this._groupsServices.getAll();
        return success(listRoles);
    };
}
