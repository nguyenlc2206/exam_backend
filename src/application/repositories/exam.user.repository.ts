/** define exam relation with user repository */
export interface ExamRelationUserRepository<T> {
    create(entity: T[]): Promise<T[]>
    getAllExamsByUserId(id: string): Promise<T[] | undefined>
    getAllExamsByAdmin(): Promise<T[] | undefined>
}
