"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRoleTableInit1694934157356 = void 0;
class GroupRoleTableInit1694934157356 {
    async up(queryRunner) { }
    async down(queryRunner) {
        const table = (await queryRunner.getTable("groups_roles_entity"));
        /** process drop foreignKey with table roles */
        const foreignKeyRole = table.foreignKeys.find((fk) => fk.columnNames.indexOf("roleId") !== -1);
        await queryRunner.dropForeignKey("groups_roles_entity", foreignKeyRole);
        await queryRunner.dropColumn("groups_roles_entity", "roleId");
        /** process drop foreignKey with table groups */
        const foreignKeyGroup = table.foreignKeys.find((fk) => fk.columnNames.indexOf("groupId") !== -1);
        await queryRunner.dropForeignKey("groups_roles_entity", foreignKeyGroup);
        await queryRunner.dropColumn("groups_roles_entity", "groupId");
        /** drop table groups_roles_entity */
        await queryRunner.dropTable("groups_roles_entity");
    }
}
exports.GroupRoleTableInit1694934157356 = GroupRoleTableInit1694934157356;
