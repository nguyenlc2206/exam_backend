import { RolesRepository } from '@src/application/repositories/roles.repository';
import { RoleServices } from '@src/application/services/roles/roles.services';
import RolesEntity from '@src/domain/entities/role.entity';

/** Implement roles services */
export class RoleServicesImpl<Entity extends RolesEntity> implements RoleServices<Entity> {
    constructor(protected repository: RolesRepository<Entity>) {}

    /** overiding create method */
    async create(entity: Entity): Promise<Entity> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overiding getByUrl method */
    async getByUrl(url: string): Promise<Entity | undefined> {
        const response = await this.repository.getByUrl(url);
        return response;
    }

    /** overiding getById method */
    async getById(id: string): Promise<Entity | undefined> {
        const response = await this.repository.getById(id);
        return response;
    }

    /** overiding update method */
    async update(entity: Entity): Promise<Entity> {
        const response = await this.repository.update(entity);
        return response;
    }

    /** overding getAll method */
    async getAll(): Promise<Entity[]> {
        const response = await this.repository.getAll();
        return response;
    }

    /** overding delete method */
    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
