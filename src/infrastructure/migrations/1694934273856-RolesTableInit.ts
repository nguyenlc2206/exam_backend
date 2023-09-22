import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class RolesTableInit1694934273856 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        /** create index with name */
        await queryRunner.createIndex(
            "roles_entity",
            new TableIndex({
                name: "IDX_ROLES_URL",
                columnNames: ["url"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("roles_entity", "IDX_ROLES_URL");
        await queryRunner.dropTable("roles_entity");
    }
}
