/** define user answer services */
export interface UserAnswerServices<Entity> {
    create(entity: Entity[]): Promise<Entity[]>;
    getByUserIdAndExamId(userId: string, examId: string, retry?: number): Promise<Entity[]>;
}
