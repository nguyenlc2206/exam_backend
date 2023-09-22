/** Define interface users repository */
export interface UsersRepository<T> {
    create(entity: T): Promise<T>
    getUserByEmail(email: string, relations?: boolean): Promise<T | undefined>
    update(entity: T): Promise<T>
    getUserById(id: string, relations?: boolean): Promise<T | undefined>
    getAll(): Promise<T[]>
    delete(id: string): Promise<void>
    restore(id: string): Promise<T>
}
