/** Define interface services roles */
export interface RoleServices<Entity> {
    create(entity: Entity): Promise<Entity>;
    getByUrl(url: string): Promise<Entity | undefined>;
    getById(id: string): Promise<Entity | undefined>;
    update(entity: Entity): Promise<Entity>;
    getAll(): Promise<Entity[]>;
    delete(id: string): Promise<void>;
}
