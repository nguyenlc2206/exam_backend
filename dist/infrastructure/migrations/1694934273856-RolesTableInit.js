"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesTableInit1694934273856 = void 0;
const typeorm_1 = require("typeorm");
class RolesTableInit1694934273856 {
    async up(queryRunner) {
        /** create index with name */
        await queryRunner.createIndex("roles_entity", new typeorm_1.TableIndex({
            name: "IDX_ROLES_URL",
            columnNames: ["url"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("roles_entity", "IDX_ROLES_URL");
        await queryRunner.dropTable("roles_entity");
    }
}
exports.RolesTableInit1694934273856 = RolesTableInit1694934273856;
