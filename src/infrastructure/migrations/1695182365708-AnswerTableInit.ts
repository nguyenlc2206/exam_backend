import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class AnswerTableInit1695182365708 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /** create index with title */
        await queryRunner.createIndex(
            "answers_entity",
            new TableIndex({
                name: "IDX_ANSWER_TITLE",
                columnNames: ["title"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("answers_entity", "IDX_ANSWER_TITLE");
        await queryRunner.dropTable("answers_entity");
    }
}
