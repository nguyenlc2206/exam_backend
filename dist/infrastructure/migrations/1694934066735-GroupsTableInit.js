"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsTableInit1694934066735 = void 0;
const typeorm_1 = require("typeorm");
class GroupsTableInit1694934066735 {
    async up(queryRunner) {
        /** insert data admin */
        await queryRunner.query(`INSERT INTO "groups_entity" (id, name) VALUES 
                ('f241b022-98a7-4f4a-b962-b191846a485e', 'admin'), 
                ('46fa1172-8262-411e-85ef-8367f01be058', 'user');`);
        /** create index with name */
        await queryRunner.createIndex("groups_entity", new typeorm_1.TableIndex({
            name: "IDX_GROUPS_NAME",
            columnNames: ["name"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("groups_entity", "IDX_GROUPS_NAME");
        await queryRunner.dropTable("groups_entity");
    }
}
exports.GroupsTableInit1694934066735 = GroupsTableInit1694934066735;
