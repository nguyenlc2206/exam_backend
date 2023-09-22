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
exports.GroupsTableInit1694934066735 = void 0;
const typeorm_1 = require("typeorm");
class GroupsTableInit1694934066735 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /** insert data admin */
            yield queryRunner.query(`INSERT INTO "groups_entity" (id, name) VALUES 
                ('f241b022-98a7-4f4a-b962-b191846a485e', 'admin'), 
                ('46fa1172-8262-411e-85ef-8367f01be058', 'user');`);
            /** create index with name */
            yield queryRunner.createIndex("groups_entity", new typeorm_1.TableIndex({
                name: "IDX_GROUPS_NAME",
                columnNames: ["name"],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropIndex("groups_entity", "IDX_GROUPS_NAME");
            yield queryRunner.dropTable("groups_entity");
        });
    }
}
exports.GroupsTableInit1694934066735 = GroupsTableInit1694934066735;
