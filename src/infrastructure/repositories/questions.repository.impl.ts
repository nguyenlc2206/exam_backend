import { EntityTarget, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import * as _ from 'lodash';
import { QuestionsRepository } from '@src/application/repositories/questions.repository';
import QuestionsEntity from '@src/domain/entities/question.entity';
import AppDataSource from '@src/infrastructure/config/typeorm.config';

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
            relations: ['answers', 'exam'],
            select: {
                id: true,
                title: true,
                subTitle: true,
                image: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                answerCorrectId: true
            },
            withDeleted: true
        } as any);
        return entities;
    }

    /** overiding update method */
    async update(entity: T): Promise<T> {
        const _cloneEntity = _.cloneDeep(entity);
        const _itemUpdate = _.omit(_cloneEntity, ['id']);
        await this.repository.update(entity?.id, _itemUpdate as any);
        return entity;
    }

    /** overiding getQuestionsByExamIds */
    async getQuestionsByExamId(id: string): Promise<T[]> {
        const criterias: any = {
            where: { exam: { id: id } } as FindOptionsWhere<any>,
            relations: ['answers'],
            select: {
                id: true,
                title: true,
                subTitle: true,
                image: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                answerCorrectId: true
            }
        };
        const entity = await this.repository.find(criterias);
        return entity;
    }

    /** overiding restore method */
    async restore(id: string): Promise<any> {
        const entityRestore = await this.repository.restore(id);
        return entityRestore;
    }
}
