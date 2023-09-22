import UsersEntity from '../../../domain/entities/user.entity';
import { UsersRepository } from '../../repositories/users.repository';
import { UsersServices } from './users.services';

/** Define users services implement */
export class UsersServicesImpl<Entity extends UsersEntity> implements UsersServices<Entity> {
    constructor(protected repository: UsersRepository<Entity>) {}

    /** overiding create method */
    async create(entity: Entity): Promise<Entity> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overiding getUserByEmail method */
    async getUserByEmail(email: string, relations?: boolean): Promise<Entity | undefined> {
        const response = await this.repository.getUserByEmail(email, relations);
        return response;
    }

    /** overiding update method */
    async update(entity: Entity): Promise<Entity> {
        const response = await this.repository.update(entity);
        return response;
    }

    /** overiding getUserById method */
    async getUserById(id: string, relations?: boolean): Promise<Entity | undefined> {
        const response = await this.repository.getUserById(id, relations);
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

    /** overiding restore method */
    async restore(id: string): Promise<any> {
        const response = await this.repository.restore(id);
        return response;
    }
}
