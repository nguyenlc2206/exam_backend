import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class ExamUserTableInit1695217649175 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /** create index with exam id */
        await queryRunner.createIndex(
            "exam_user_entity",
            new TableIndex({
                name: "IDX_EXAM_ID",
                columnNames: ["examId"],
            })
        );

        /** create index with user id */
        await queryRunner.createIndex(
            "exam_user_entity",
            new TableIndex({
                name: "IDX_USER_ID",
                columnNames: ["userId"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("exam_user_entity", "IDX_EXAM_ID");
        await queryRunner.dropIndex("exam_user_entity", "IDX_USER_ID");
        await queryRunner.dropTable("exam_user_entity");
    }
}
