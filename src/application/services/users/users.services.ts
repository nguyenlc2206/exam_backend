/** Define users services */
export interface UsersServices<Entity> {
    create(entity: Entity): Promise<Entity>;
    getUserByEmail(email: string, relations?: boolean): Promise<Entity | undefined>;
    update(entity: Entity): Promise<Entity>;
    getUserById(id: string, relations?: boolean): Promise<Entity | undefined>;
    getAll(): Promise<Entity[]>;
    delete(id: string): Promise<void>;
    restore(id: string): Promise<Entity>;
}
