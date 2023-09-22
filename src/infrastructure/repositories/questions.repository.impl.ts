import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';
import * as _ from 'lodash';

import AppDataSource from '../config/typeorm.config';
import QuestionsEntity from '../../domain/entities/question.entity';
import { QuestionsRepository } from '../../application/repositories/questions.repository';

/** define questions repository implement */
export class QuestionsRepositoryImpl<T extends QuestionsEntity> implements QuestionsRepository<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    /** overiding create method */
    async create(entity: T[]): Promise<T[]> {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }

    /** overiding getById method */
    async getById(id: string, relations?: boolean): Promise<T | undefined> {
        let criterias: any = {
            where: { id: id } as FindOptionsWhere<T | undefined>,
            withDeleted: true
        };
        if (relations)
            criterias = {
                ...criterias,
                relations: ['anwsers']
            };
        const entity = await this.repository.findOne(criterias);
        if (!entity) return undefined;
        return entity;
    }

    /** overiding delete method */
    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

    /** overding getAll method */
    async getAll(): Promise<T[]> {
        const entities = await this.repository.find({
            relations: ['answers']
            // withDeleted: true,
        });
        return entities;
    }

    /** overiding update method */
    async update(entity: T): Promise<T> {
        const _cloneEntity = _.cloneDeep(entity);
        const _itemUpdate = _.omit(_cloneEntity, ['id']);
        await this.repository.update(entity?.id, _itemUpdate as any);
        return entity;
    }
}
