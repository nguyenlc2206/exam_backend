/** define anwsers repository */
export interface AnswersRepository<T> {
    create(entity: T[]): Promise<T[]>
    getByQuestionId(id: string): Promise<T[]>
    remove(entity: T[]): Promise<void>
    delete(id: string): Promise<void>
    getById(id: string): Promise<T | undefined>
}
