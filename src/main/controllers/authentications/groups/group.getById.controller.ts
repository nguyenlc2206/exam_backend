import { NextFunction, Request, Response } from 'express';

import { GroupsServices } from '@src/application/services/groups/groups.services';
import GroupsEntity from '@src/domain/entities/group.entity';
import catchAsync from '@src/shared/catch-async';
import AppError from '@src/error-handling/app.error';
import { Either, failure, success } from '@src/shared/functions';

/** define execute get group by id */
export class GetGroupById {
    constructor(private _groupsServices: GroupsServices<GroupsEntity>) {}

    /** define execute function */
    execute = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        /** @todo: processing get group by id */
        const groupResult = await this.handleGetGroupById(req.params.id);
        if (groupResult.isFailure()) return next(groupResult.error);

        /** @todo: processing reponse */
        res.status(200).json({
            status: 'success',
            message: 'Get group by id success',
            data: {
                group: groupResult.data
            }
        });
    });

    /** @todo: processing get group by id */
    private async handleGetGroupById(id: string): Promise<Either<GroupsEntity, AppError>> {
        const group = await this._groupsServices.getById(id);
        if (!group) return failure(new AppError('Group id is not exists in database!,', 400));
        return success(group);
    }
}
