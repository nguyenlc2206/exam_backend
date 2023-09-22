import { NextFunction, Request, Response } from 'express';
import { CreateGroupController } from './group.create.controller';
import { UpdateGroupController } from './group.update.controller';
import { GetAllGroupsController } from './group.getAll.controller';
import { GroupsServices } from '../../../../application/services/groups/groups.services';
import GroupsEntity from '../../../../domain/entities/group.entity';

/** Define groups controller */
export class GroupsController {
    private service: GroupsServices<GroupsEntity>;

    constructor(service: GroupsServices<GroupsEntity>) {
        this.service = service;
    }

    /** create method */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createGroup = new CreateGroupController(this.service);
        return createGroup.execute(req, res, next);
    };

    /** update method */
    update = async (req: Request, res: Response, next: NextFunction) => {
        const updateGroup = new UpdateGroupController(this.service);
        return updateGroup.execute(req, res, next);
    };

    /** getAll method */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const getAllGroups = new GetAllGroupsController(this.service);
        return getAllGroups.execute(req, res, next);
    };
}
