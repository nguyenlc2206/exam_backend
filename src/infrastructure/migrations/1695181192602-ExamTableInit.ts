import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class ExamTableInit1695181192602 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /** create index with title */
        await queryRunner.createIndex(
            "exams_entity",
            new TableIndex({
                name: "IDX_EXAM_TITLE",
                columnNames: ["title"],
            })
        );

        /** create index with status */
        await queryRunner.createIndex(
            "exams_entity",
            new TableIndex({
                name: "IDX_EXAM_STATUS",
                columnNames: ["status"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("exams_entity", "IDX_EXAM_TITLE");
        await queryRunner.dropIndex("exams_entity", "IDX_EXAM_STATUS");
        await queryRunner.dropTable("exams_entity");
    }
}
