import QuestionsEntity from '../../../domain/entities/question.entity';
import { QuestionsRepository } from '../../repositories/questions.repository';
import { QuestionsServices } from './questions.services';

/** define questions service implement */
export class QuestionsServicesImpl<Entity extends QuestionsEntity> implements QuestionsServices<Entity> {
    constructor(private repository: QuestionsRepository<Entity>) {}

    /** overiding create method */
    async create(entity: Entity[]): Promise<Entity[]> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overding delete method */
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    /** overiding getUserById method */
    async getById(id: string, relations?: boolean): Promise<Entity | undefined> {
        const response = await this.repository.getById(id, relations);
        return response;
    }

    /** overding getAll method */
    async getAll(): Promise<Entity[]> {
        const response = await this.repository.getAll();
        return response;
    }

    /** overiding update method */
    async update(entity: Entity): Promise<Entity> {
        const response = await this.repository.update(entity);
        return response;
    }
}
