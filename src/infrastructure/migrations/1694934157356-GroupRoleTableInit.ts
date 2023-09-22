import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class GroupRoleTableInit1694934157356 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {}

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = (await queryRunner.getTable(
            "groups_roles_entity"
        )) as Table;

        /** process drop foreignKey with table roles */
        const foreignKeyRole: any = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("roleId") !== -1
        );
        await queryRunner.dropForeignKey("groups_roles_entity", foreignKeyRole);
        await queryRunner.dropColumn("groups_roles_entity", "roleId");

        /** process drop foreignKey with table groups */
        const foreignKeyGroup: any = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("groupId") !== -1
        );
        await queryRunner.dropForeignKey(
            "groups_roles_entity",
            foreignKeyGroup
        );
        await queryRunner.dropColumn("groups_roles_entity", "groupId");

        /** drop table groups_roles_entity */
        await queryRunner.dropTable("groups_roles_entity");
    }
}
