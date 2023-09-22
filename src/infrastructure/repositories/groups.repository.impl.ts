import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';
import * as _ from 'lodash';

import AppDataSource from '../config/typeorm.config';
import GroupsEntity from '../../domain/entities/group.entity';
import { GroupsRepository } from '../../application/repositories/groups.repository';

/** Define groups repository implement */
export class GroupsRepositoryImpl<T extends GroupsEntity> implements GroupsRepository<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    /** overiding create method */
    async create(entity: T): Promise<T> {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }

    /** overiding getByName method */
    async getByName(name: string): Promise<T | undefined> {
        const criterias = { where: { name: name } as FindOptionsWhere<T> };
        const entity = await this.repository.findOne(criterias);
        if (!entity) return undefined;
        return entity;
    }

    /** overding getById method */
    async getById(id?: number): Promise<T | undefined> {
        const criterias = { where: { id: id } as FindOptionsWhere<T> };
        const entity = await this.repository.findOne(criterias);
        if (!entity) return undefined;
        return entity;
    }

    /** overiding update method */
    async update(entity: T): Promise<T> {
        const _cloneEntity = _.cloneDeep(entity);
        const _itemUpdate = _.omit(_cloneEntity, ['id']);
        await this.repository.update(entity?.id, _itemUpdate as any);
        return entity;
    }

    /** overding getAll method */
    async getAll(): Promise<T[]> {
        const entities = await this.repository.find();
        return entities;
    }
}
