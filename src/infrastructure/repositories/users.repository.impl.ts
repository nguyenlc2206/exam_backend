import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm'
import * as _ from 'lodash'

import { AppDataSource } from '../config/typeorm.config'
import UsersEntity from 'src/domain/entities/user.entity'
import { UsersRepository } from 'src/application/repositories/users.repository'

/** Define repository users implement */
export class UsersRepositoryImpl<T extends UsersEntity> implements UsersRepository<T> {
    protected repository: Repository<T>

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity)
    }

    /** overding create method */
    async create(entity: T): Promise<T> {
        const entityCreate = await this.repository.save(entity)
        return entityCreate
    }

    /** overiding getUserByEmail method */
    async getUserByEmail(email: string, relations?: boolean): Promise<T | undefined> {
        let criterias: any = {
            where: { email: email } as FindOptionsWhere<T | undefined>,
            select: {
                password: true,
                id: true,
                username: true,
                phoneNumber: true,
                email: true,
                status: true,
                group: true,
                passwordChangedAt: true,
                updatedAt: true,
                deletedAt: true
            },
            withDeleted: true
        }
        if (relations)
            criterias = {
                ...criterias,
                relations: ['group']
            }
        const entity = await this.repository.findOne(criterias)
        if (!entity) return undefined
        return entity
    }

    /** overiding update method */
    async update(entity: T): Promise<T> {
        const _cloneEntity = _.cloneDeep(entity)
        const _itemUpdate = _.omit(_cloneEntity, ['id'])
        await this.repository.update(entity?.id, _itemUpdate as any)
        return entity
    }

    /** overiding getUserById method */
    async getUserById(id: string, relations?: boolean): Promise<T | undefined> {
        let criterias: any = {
            where: { id: id } as FindOptionsWhere<T | undefined>,
            select: {
                password: true,
                id: true,
                username: true,
                phoneNumber: true,
                email: true,
                status: true,
                group: true,
                passwordChangedAt: true,
                updatedAt: true,
                deletedAt: true
            },
            withDeleted: true
        }
        if (relations)
            criterias = {
                ...criterias,
                relations: ['group']
            }
        const entity = await this.repository.findOne(criterias)
        if (!entity) return undefined
        return entity
    }

    /** overding getAll method */
    async getAll(): Promise<T[]> {
        const entities = await this.repository.find({
            relations: ['group'],
            withDeleted: true
        })
        return entities
    }

    /** overiding delete method */
    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id)
    }

    /** overiding restore method */
    async restore(id: string): Promise<any> {
        const entityRestore = await this.repository.restore(id)
        return entityRestore
    }
}
