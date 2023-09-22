import GroupsEntity from "src/domain/entities/group.entity";
import { GroupsServices } from "./groups.services";
import { GroupsRepository } from "src/application/repositories/groups.repository";

/** Define groups services implement */
export class GroupsServicesImpl<Entity extends GroupsEntity>
    implements GroupsServices<Entity>
{
    constructor(private repository: GroupsRepository<Entity>) {}

    /** overiding create method */
    async create(entity: Entity): Promise<Entity> {
        const response = await this.repository.create(entity);
        return response;
    }

    /** overiding getByName method */
    async getByName(name: string): Promise<Entity | undefined> {
        const response = await this.repository.getByName(name);
        return response;
    }

    /** overiding getById method */
    async getById(id: number): Promise<Entity | undefined> {
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
}
