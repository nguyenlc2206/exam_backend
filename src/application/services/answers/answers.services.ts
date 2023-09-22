/** define anwsers services */
export interface AnswersServices<Entity> {
    create(entity: Entity[]): Promise<Entity[]>
    getByQuestionId(id: string): Promise<Entity[]>
    remove(entity: Entity[]): Promise<void>
    delete(id: string): Promise<void>
    getById(id: string): Promise<Entity | undefined>
}
