"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTableInit1694931638143 = void 0;
const typeorm_1 = require("typeorm");
class UsersTableInit1694931638143 {
    async up(queryRunner) {
        /** insert data admin */
        await queryRunner.query(`INSERT INTO "users_entity" ("username", "email", "password", "groupId")
                VALUES ('admin', 'admin@gmail.com', '$2b$12$Kr9gzJWvj1fROZmYaekSpeHvg46wOOVimce/WFlvUU58b0ze4lXOm',
                (SELECT id FROM groups_entity WHERE groups_entity.name = 'admin'));`);
        /** create index with email */
        await queryRunner.createIndex("users_entity", new typeorm_1.TableIndex({
            name: "IDX_USER_EMAIL",
            columnNames: ["email"],
        }));
    }
    async down(queryRunner) {
        const table = (await queryRunner.getTable("users_entity"));
        /** process drop foreignKey with table groups */
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf("groupId") !== -1);
        await queryRunner.dropForeignKey("users_entity", foreignKey);
        await queryRunner.dropColumn("users_entity", "groupId");
        await queryRunner.dropIndex("users_entity", "IDX_USER_EMAIL");
        await queryRunner.dropTable("users_entity");
    }
}
exports.UsersTableInit1694931638143 = UsersTableInit1694931638143;
