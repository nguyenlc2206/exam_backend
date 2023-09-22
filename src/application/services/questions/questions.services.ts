/** define questions services */
export interface QuestionsServices<Entity> {
    create(entity: Entity[]): Promise<Entity[]>;
    getById(id: string, relations?: boolean): Promise<Entity | undefined>;
    getAll(): Promise<Entity[]>;
    delete(id: string): Promise<void>;
    update(entity: Entity): Promise<Entity>;
}
