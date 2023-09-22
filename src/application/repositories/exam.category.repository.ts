/** Define exam category repository */
export interface ExamsCategoryRepository<T> {
    create(entity: T): Promise<T>
    getCategoryByName(name: string): Promise<T | undefined>
    getAll(): Promise<T[]>
}
