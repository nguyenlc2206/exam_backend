/** define exam user services */
export interface ExamRelationUserServices<Entity> {
    create(entity: Entity[]): Promise<Entity[]>;
    getAllExamsByUserId(id: string): Promise<Entity[] | undefined>;
    getAllExamsByAdmin(): Promise<Entity[] | undefined>;
}
