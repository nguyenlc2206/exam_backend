/** Define method groups services */
export interface GroupsServices<Entity> {
    create(entity: Entity): Promise<Entity>
    getByName(name: string): Promise<Entity | undefined>
    getById(id: number): Promise<Entity | undefined>
    update(entity: Entity): Promise<Entity>
    getAll(): Promise<Entity[]>
}
