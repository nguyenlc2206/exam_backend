"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRoleTableInit1694934157356 = void 0;
class GroupRoleTableInit1694934157356 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = (yield queryRunner.getTable("groups_roles_entity"));
            /** process drop foreignKey with table roles */
            const foreignKeyRole = table.foreignKeys.find((fk) => fk.columnNames.indexOf("roleId") !== -1);
            yield queryRunner.dropForeignKey("groups_roles_entity", foreignKeyRole);
            yield queryRunner.dropColumn("groups_roles_entity", "roleId");
            /** process drop foreignKey with table groups */
            const foreignKeyGroup = table.foreignKeys.find((fk) => fk.columnNames.indexOf("groupId") !== -1);
            yield queryRunner.dropForeignKey("groups_roles_entity", foreignKeyGroup);
            yield queryRunner.dropColumn("groups_roles_entity", "groupId");
            /** drop table groups_roles_entity */
            yield queryRunner.dropTable("groups_roles_entity");
        });
    }
}
exports.GroupRoleTableInit1694934157356 = GroupRoleTableInit1694934157356;
