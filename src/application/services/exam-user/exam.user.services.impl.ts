import { ExamRelationUserRepository } from '@src/application/repositories/exam.user.repository';
import { ExamRelationUserServices } from '@src/application/services/exam-user/exam.user.services';
import ExamUserEntity from '@src/domain/entities/examUser.entity';

/** define exam user services implement */
export class ExamRelationUserServicesImpl<Entity extends ExamUserEntity> implements ExamRelationUserServices<Entity> {
    constructor(private repository: ExamRelationUserRepository<Entity>) {}

    /** overding create method */
    async create(entity: Entity[]): Promise<Entity[]> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overding getAllExamsByUserId method */
    async getAllExamsByUserId(id: string): Promise<Entity[] | undefined> {
        const response = await this.repository.getAllExamsByUserId(id);
        return response;
    }

    /** overding getByUserIdAndExamId method */
    async getByUserIdAndExamId(userId: string, examId: string, retry: number): Promise<Entity[]> {
        const response = await this.repository.getByUserIdAndExamId(userId, examId, retry);
        return response;
    }

    /** overding getAllExamsByAdmin method */
    async getAllExamsByAdmin(): Promise<Entity[] | undefined> {
        const response = await this.repository.getAllExamsByAdmin();
        return response;
    }

    /** overding getAllExamsByAdmin method */
    async update(entity: Entity): Promise<void> {
        const response = await this.repository.update(entity);
        return response;
    }
}
