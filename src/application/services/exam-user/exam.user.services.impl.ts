import { ExamRelationUserRepository } from 'src/application/repositories/exam.user.repository'
import { ExamRelationUserServices } from './exam.user.services'
import ExamUserEntity from 'src/domain/entities/examUser.entity'

/** define exam user services implement */
export class ExamRelationUserServicesImpl<Entity extends ExamUserEntity> implements ExamRelationUserServices<Entity> {
    constructor(private repository: ExamRelationUserRepository<Entity>) {}

    /** overding create method */
    async create(entity: Entity[]): Promise<Entity[]> {
        const response = await this.repository.create(entity)
        return response
    }

    /** overding getAllExamsByUserId method */
    async getAllExamsByUserId(id: string): Promise<Entity[] | undefined> {
        const response = await this.repository.getAllExamsByUserId(id)
        return response
    }

    /** overding getAllExamsByAdmin method */
    async getAllExamsByAdmin(): Promise<Entity[] | undefined> {
        const response = await this.repository.getAllExamsByAdmin()
        return response
    }
}
