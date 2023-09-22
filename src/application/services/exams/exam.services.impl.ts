import { ExamsRepository } from '@src/application/repositories/exam.repository';
import { ExamsServices } from '@src/application/services/exams/exam.services';
import ExamsEntity from '@src/domain/entities/exam.entity';

/** define exam services implement */
export class ExamsServicesImpl<Entity extends ExamsEntity> implements ExamsServices<Entity> {
    constructor(private repository: ExamsRepository<Entity>) {}

    /** overiding create method */
    async create(entity: Entity): Promise<Entity> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overiding update method */
    async update(entity: Entity): Promise<Entity> {
        const response = await this.repository.update(entity);
        return response;
    }

    /** overiding getById method */
    async getById(id: string, relations?: boolean): Promise<Entity | undefined> {
        const response = await this.repository.getById(id, relations);
        return response;
    }

    /** overding getAll method */
    async getAll(): Promise<Entity[]> {
        const response = await this.repository.getAll();
        return response;
    }
}
