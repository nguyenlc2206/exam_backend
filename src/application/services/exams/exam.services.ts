/** define exam services */
export interface ExamsServices<Entity> {
    create(entity: Entity): Promise<Entity>;
    getById(id: string, relations?: boolean): Promise<Entity | undefined>;
    update(entity: Entity): Promise<Entity>;
    getAll(): Promise<Entity[]>;
}
