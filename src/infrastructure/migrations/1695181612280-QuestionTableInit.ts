import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class QuestionTableInit1695181612280 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /** create index with status */
        await queryRunner.createIndex(
            "questions_entity",
            new TableIndex({
                name: "IDX_QUESTION_STATUS",
                columnNames: ["status"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("questions_entity", "IDX_QUESTION_STATUS");
        await queryRunner.dropTable("questions_entity");
    }
}
