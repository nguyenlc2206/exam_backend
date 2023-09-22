import AnswersEntity from '../../../domain/entities/answer.entity';
import { AnswersRepository } from '../../repositories/answers.repository';
import { AnswersServices } from './answers.services';

/** define anwsers services implement */
export class AnwsersServicesImpl<Entity extends AnswersEntity> implements AnswersServices<Entity> {
    constructor(private repository: AnswersRepository<Entity>) {}

    /** overiding create method */
    async create(entity: Entity[]): Promise<Entity[]> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overding getByQuestionId method */
    async getByQuestionId(id: string): Promise<Entity[]> {
        const response = await this.repository.getByQuestionId(id);
        return response;
    }

    /** overding remove method */
    async remove(entity: Entity[]): Promise<void> {
        await this.repository.remove(entity);
    }

    /** overding delete method */
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    /** overiding getById method */
    async getById(id: string): Promise<Entity | undefined> {
        const response = await this.repository.getById(id);
        return response;
    }
}
