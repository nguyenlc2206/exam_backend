/** define category services */
export interface CategoryServices<Entity> {
    create(entity: Entity): Promise<Entity>
    getCategoryByName(name: string): Promise<Entity | undefined>
    getAll(): Promise<Entity[]>
}
