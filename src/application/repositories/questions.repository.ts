/** define question repository */
export interface QuestionsRepository<T> {
    create(entity: T[]): Promise<T[]>;
    getById(id: string, relations?: boolean): Promise<T | undefined>;
    update(entity: T): Promise<T>;
    getAll(): Promise<T[]>;
    delete(id: string): Promise<void>;
    getQuestionsByExamId(id: string): Promise<T[]>;
    restore(id: string): Promise<T>;
}
