/** define exam relation with user repository */
export interface ExamRelationUserRepository<T> {
    create(entity: T[]): Promise<T[]>;
    update(entity: T): Promise<void>;
    getAllExamsByUserId(id: string): Promise<T[] | undefined>;
    getByUserIdAndExamId(userId: string, examId: string, retry: number): Promise<T[]>;
    getAllExamsByAdmin(): Promise<T[] | undefined>;
}
