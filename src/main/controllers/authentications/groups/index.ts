import { GroupsServices } from '@src/application/services/groups/groups.services';
import GroupsEntity from '@src/domain/entities/group.entity';
import { NextFunction, Request, Response } from 'express';
import { CreateGroupController } from '@src/main/controllers/authentications/groups/group.create.controller';
import { GetAllGroupsController } from '@src/main/controllers/authentications/groups/group.getAll.controller';
import { UpdateGroupController } from '@src/main/controllers/authentications/groups/group.update.controller';
import { GetGroupById } from './group.getById.controller';

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

    /** getByID method */
    getById = async (req: Request, res: Response, next: NextFunction) => {
        const getGroupById = new GetGroupById(this.service);
        return getGroupById.execute(req, res, next);
    };
}
