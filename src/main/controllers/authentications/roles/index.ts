import { NextFunction, Request, Response } from 'express'

import { CreateRoleController } from './role.create.controller'
import { UpdateRoleController } from './role.update.controller'
import { GetAllRoleController } from './role.getAll.controller'
import { DeleteRoleController } from './role.delete.controller'
import { RoleServices } from 'src/application/services/roles/roles.services'
import RolesEntity from 'src/domain/entities/role.entity'

/** Define make create role controller */
export class RolesController {
    private service: RoleServices<RolesEntity>

    constructor(service: RoleServices<RolesEntity>) {
        this.service = service
    }

    /** create role */
    create = async (req: Request, res: Response, next: NextFunction) => {
        const createRole = new CreateRoleController(this.service)
        return createRole.execute(req, res, next)
    }

    /** update role */
    update = async (req: Request, res: Response, next: NextFunction) => {
        const updateRole = new UpdateRoleController(this.service)
        return updateRole.execute(req, res, next)
    }

    /** get all roles */
    getAll = async (req: Request, res: Response, next: NextFunction) => {
        const listRoles = new GetAllRoleController(this.service)
        return listRoles.execute(req, res, next)
    }

    /** delete roles */
    delete = async (req: Request, res: Response, next: NextFunction) => {
        const deleteRole = new DeleteRoleController(this.service)
        return deleteRole.execute(req, res, next)
    }
}
