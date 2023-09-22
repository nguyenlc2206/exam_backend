import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class ExamCategoryTableInit1695178172833 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /** create index with name */
        await queryRunner.createIndex(
            'exams_category_entity',
            new TableIndex({
                name: 'IDX_EXAM_CATEGORY_NAME',
                columnNames: ['name']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('exams_category_entity', 'IDX_EXAM_CATEGORY_NAME');
        await queryRunner.dropTable('exams_category_entity');
    }
}
