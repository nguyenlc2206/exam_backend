import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';

import { AppDataSource } from '../config/typeorm.config';
import ExamsCategoryEntity from '../../domain/entities/exam.category.entity';
import { ExamsCategoryRepository } from '../../application/repositories/exam.category.repository';

/** define exam category repository implement */
export class ExamsCategoryRepositoryImpl<T extends ExamsCategoryEntity> implements ExamsCategoryRepository<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    /** overiding create method */
    async create(entity: T): Promise<T> {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }

    /** overiding getCategoryByName method */
    async getCategoryByName(name: string): Promise<T | undefined> {
        const criterias = { where: { name: name } as FindOptionsWhere<T> };
        const entity = await this.repository.findOne(criterias);
        if (!entity) return undefined;
        return entity;
    }

    /** overiding getAll method */
    async getAll(): Promise<T[]> {
        const entities = await this.repository.find();
        return entities;
    }
}
