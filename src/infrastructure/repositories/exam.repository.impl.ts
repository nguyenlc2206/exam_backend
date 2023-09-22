import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';
import * as _ from 'lodash';
import { ExamsRepository } from '@src/application/repositories/exam.repository';
import ExamsEntity from '@src/domain/entities/exam.entity';
import AppDataSource from '@src/infrastructure/config/typeorm.config';

/** define exam repository implement */
export class ExamsRepositoryImpl<T extends ExamsEntity> implements ExamsRepository<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    /** overiding create method */
    async create(entity: T): Promise<T> {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }

    /** overiding update method */
    async update(entity: T): Promise<T> {
        const _cloneEntity = _.cloneDeep(entity);
        const _itemUpdate = _.omit(_cloneEntity, ['id']);
        await this.repository.update(entity?.id, _itemUpdate as any);
        return entity;
    }

    /** overiding getById method */
    async getById(id: string, relations?: boolean): Promise<T | undefined> {
        let criterias: any = { where: { id: id } as FindOptionsWhere<T> };
        if (relations)
            criterias = {
                ...criterias,
                relations: ['questions']
            };
        const entity = await this.repository.findOne(criterias);
        if (!entity) return undefined;
        return entity;
    }

    /** overiding getAll method */
    async getAll(): Promise<T[]> {
        const entities = await this.repository.find({
            relations: ['questions']
        });
        return entities;
    }
}
