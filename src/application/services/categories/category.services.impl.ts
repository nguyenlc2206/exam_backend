import ExamsCategoryEntity from '../../../domain/entities/exam.category.entity';
import { ExamsCategoryRepository } from '../../repositories/exam.category.repository';
import { CategoryServices } from './category.services';

/** Deinf category services implement */
export class CategoryServicesImpl<Entity extends ExamsCategoryEntity> implements CategoryServices<Entity> {
    constructor(private repository: ExamsCategoryRepository<Entity>) {}

    /** overiding create method */
    async create(entity: Entity): Promise<Entity> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overiding getCategoryByName method */
    async getCategoryByName(name: string): Promise<Entity | undefined> {
        const response = await this.repository.getCategoryByName(name);
        return response;
    }

    /** overding getAll method */
    async getAll(): Promise<Entity[]> {
        const response = await this.repository.getAll();
        return response;
    }
}
