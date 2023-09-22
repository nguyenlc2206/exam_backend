import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';
import * as _ from 'lodash';
import { RolesRepository } from '@src/application/repositories/roles.repository';
import RolesEntity from '@src/domain/entities/role.entity';
import AppDataSource from '@src/infrastructure/config/typeorm.config';

/** Define role repository impl */
export class RolesRepositoryImpl<T extends RolesEntity> implements RolesRepository<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    /** overding create method */
    async create(entity: T): Promise<T> {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }

    /** overiding getByUrl method */
    async getByUrl(url?: string): Promise<T | undefined> {
        const criterias = { where: { url: url } as FindOptionsWhere<T> };
        const entity = await this.repository.findOne(criterias);
        if (!entity) return undefined;
        return entity;
    }

    /** overding getById method */
    async getById(id?: string): Promise<T | undefined> {
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

    /** overding delete method */
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
