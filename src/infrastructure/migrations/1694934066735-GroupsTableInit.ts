import { MigrationInterface, QueryRunner, TableIndex } from "typeorm";

export class GroupsTableInit1694934066735 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /** insert data admin */
        await queryRunner.query(
            `INSERT INTO "groups_entity" (id, name) VALUES 
                ('f241b022-98a7-4f4a-b962-b191846a485e', 'admin'), 
                ('46fa1172-8262-411e-85ef-8367f01be058', 'user');`
        );
        /** create index with name */
        await queryRunner.createIndex(
            "groups_entity",
            new TableIndex({
                name: "IDX_GROUPS_NAME",
                columnNames: ["name"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("groups_entity", "IDX_GROUPS_NAME");
        await queryRunner.dropTable("groups_entity");
    }
}
