import * as _ from 'lodash';
import { UserAnswerReporitory } from '@src/application/repositories/user.answer.repository';
import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';
import { EntityTarget, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import AppDataSource from '../config/typeorm.config';

/** define user answer repository implement */
export class UserAnswerReporitoryImpl<T extends UserAnswerEntity> implements UserAnswerReporitory<T> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    /** overiding create method */
    async create(entity: T[]): Promise<T[]> {
        const entityCreate = await this.repository.save(entity);
        return entityCreate;
    }

    /** overiding getByUserIdAndExamId method */
    async getByUserIdAndExamId(userId: string, examId: string, retry: number): Promise<T[]> {
        const criterias: any = {
            where: { user: { id: userId }, exam: { id: examId }, retryId: retry } as FindOptionsWhere<any>,
            select: {
                answerUserId: true,
                answerCorrectId: true,
                question: {
                    id: true,
                    title: true,
                    subTitle: true,
                    image: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
                    answers: {
                        id: true,
                        title: true
                    }
                }
            },
            relations: ['question', 'question.answers', 'exam']
        };
        const entity = await this.repository.find(criterias);
        return entity;
    }
}
