import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnSubTitleExamTable1695909737822 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'exams_entity',
            new TableColumn({
                name: 'subTitle',
                type: 'varchar'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('exams_entity', 'subTitle');
    }
}
