import { EntityTarget, FindOptionsWhere, Repository } from 'typeorm';

import AppDataSource from '../config/typeorm.config';
import AnswersEntity from '../../domain/entities/answer.entity';
import { AnswersRepository } from '../../application/repositories/answers.repository';

/** define anwsers repository implement */
export class AnwsersRepositoryImpl<T extends AnswersEntity> implements AnswersRepository<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    /** overiding create method */
    async create(entity: T[]): Promise<T[]> {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }

    /** overding getByQuestionId method */
    async getByQuestionId(id: string): Promise<T[]> {
        const criterias = {
            where: { question: { id: id } } as FindOptionsWhere<any>
        };
        const entity = await this.repository.find(criterias);
        return entity;
    }

    /** overding remove method */
    async remove(entity: T[]): Promise<void> {
        await this.repository.remove(entity);
    }

    /** overiding delete method */
    async delete(id: string): Promise<void> {
        await this.repository.softDelete(id);
    }

    /** overding getById method */
    async getById(id?: string): Promise<T | undefined> {
        const criterias = { where: { id: id } as FindOptionsWhere<T> };
        const entity = await this.repository.findOne(criterias);
        if (!entity) return undefined;
        return entity;
    }
}
