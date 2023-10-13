/** define user answer repository */
export interface UserAnswerReporitory<T> {
    create(entity: T[]): Promise<T[]>;
    getByUserIdAndExamId(userId: string, examId: string, retry: number): Promise<T[]>;
}
