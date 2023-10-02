/** Define groups repository */
export interface GroupsRepository<T> {
    create(entity: T): Promise<T>;
    getByName(name?: string): Promise<T | undefined>;
    getById(id?: string): Promise<T | undefined>;
    update(entity: T): Promise<T>;
    getAll(): Promise<T[]>;
}
