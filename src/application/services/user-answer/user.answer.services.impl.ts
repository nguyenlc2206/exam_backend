import UserAnswerEntity from '@src/domain/entities/userAnswer.entity';
import { UserAnswerServices } from '@src/application/services/user-answer/user.answer.services';
import { UserAnswerReporitory } from '@src/application/repositories/user.answer.repository';

export class UserAnswerServicesImpl<Entity extends UserAnswerEntity> implements UserAnswerServices<Entity> {
    constructor(private repository: UserAnswerReporitory<Entity>) {}

    /** overding create method */
    async create(entity: Entity[]): Promise<Entity[]> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overding getByUserIdAndExamId method */
    async getByUserIdAndExamId(userId: string, examId: string, retry: number): Promise<Entity[]> {
        const response = await this.repository.getByUserIdAndExamId(userId, examId, retry);
        return response;
    }
}
