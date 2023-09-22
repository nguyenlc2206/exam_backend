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
exports.RolesTableInit1694934273856 = void 0;
const typeorm_1 = require("typeorm");
class RolesTableInit1694934273856 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /** create index with name */
            yield queryRunner.createIndex("roles_entity", new typeorm_1.TableIndex({
                name: "IDX_ROLES_URL",
                columnNames: ["url"],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropIndex("roles_entity", "IDX_ROLES_URL");
            yield queryRunner.dropTable("roles_entity");
        });
    }
}
exports.RolesTableInit1694934273856 = RolesTableInit1694934273856;
