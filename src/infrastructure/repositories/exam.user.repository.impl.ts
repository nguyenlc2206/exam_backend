import { EntityTarget, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { ExamRelationUserRepository } from '~/application/repositories/exam.user.repository';
import ExamUserEntity from '~/domain/entities/examUser.entity';
import { AppDataSource } from '../config/typeorm.config';

/** define exam relation with user repository implement */
export class ExamRelationUserRepositoryImpl<T extends ExamUserEntity> implements ExamRelationUserRepository<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    /** overiding create method */
    async create(entity: T[]): Promise<T[]> {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }

    /** overiding getAllExamsByUserId method */
    async getAllExamsByUserId(id: string): Promise<T[] | undefined> {
        const criterias = {
            where: { user: { id: id } } as FindOptionsWhere<any>,
            relations: { exam: true } as FindOptionsRelations<any>
        };
        const entity = await this.repository.find(criterias);
        if (entity.length === 0) return undefined;
        return entity;
    }

    /** overiding getAllExamsByAdmin method */
    async getAllExamsByAdmin(): Promise<T[] | undefined> {
        const criterias = {
            relations: {
                exam: true,
                user: true
            } as FindOptionsRelations<any>,
            withDeleted: true
        };
        const entity = await this.repository.find(criterias);
        if (entity.length === 0) return undefined;
        return entity;
    }
}
