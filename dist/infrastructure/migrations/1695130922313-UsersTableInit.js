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
exports.UsersTableInit1694931638143 = void 0;
const typeorm_1 = require("typeorm");
class UsersTableInit1694931638143 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /** insert data admin */
            yield queryRunner.query(`INSERT INTO "users_entity" ("username", "email", "password", "groupId")
                VALUES ('admin', 'admin@gmail.com', '$2b$12$Kr9gzJWvj1fROZmYaekSpeHvg46wOOVimce/WFlvUU58b0ze4lXOm',
                (SELECT id FROM groups_entity WHERE groups_entity.name = 'admin'));`);
            /** create index with email */
            yield queryRunner.createIndex("users_entity", new typeorm_1.TableIndex({
                name: "IDX_USER_EMAIL",
                columnNames: ["email"],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = (yield queryRunner.getTable("users_entity"));
            /** process drop foreignKey with table groups */
            const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf("groupId") !== -1);
            yield queryRunner.dropForeignKey("users_entity", foreignKey);
            yield queryRunner.dropColumn("users_entity", "groupId");
            yield queryRunner.dropIndex("users_entity", "IDX_USER_EMAIL");
            yield queryRunner.dropTable("users_entity");
        });
    }
}
exports.UsersTableInit1694931638143 = UsersTableInit1694931638143;
