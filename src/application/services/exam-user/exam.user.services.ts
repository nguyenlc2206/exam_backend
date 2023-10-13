/** define exam user services */
export interface ExamRelationUserServices<Entity> {
    create(entity: Entity[]): Promise<Entity[]>;
    update(entity: Entity): Promise<void>;
    getAllExamsByUserId(id: string): Promise<Entity[] | undefined>;
    getByUserIdAndExamId(userId: string, examId: string, retry?: number): Promise<Entity[]>;
    getAllExamsByAdmin(): Promise<Entity[] | undefined>;
}
