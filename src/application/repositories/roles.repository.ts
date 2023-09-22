/** Define interface roles repository */
export interface RolesRepository<T> {
    create(entity: T): Promise<T>;
    getByUrl(url?: string): Promise<T | undefined>;
    getById(id?: string): Promise<T | undefined>;
    update(entity: T): Promise<T>;
    getAll(): Promise<T[]>;
    delete(id: string): Promise<void>;
}
