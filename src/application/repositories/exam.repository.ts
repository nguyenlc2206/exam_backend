/** define exam category repository */
export interface ExamsRepository<T> {
    create(entity: T): Promise<T>
    getById(id: string, relations?: boolean): Promise<T | undefined>
    update(entity: T): Promise<T>
    getAll(): Promise<T[]>
}
