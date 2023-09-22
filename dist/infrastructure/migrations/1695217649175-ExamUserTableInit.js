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
exports.ExamUserTableInit1695217649175 = void 0;
const typeorm_1 = require("typeorm");
class ExamUserTableInit1695217649175 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /** create index with exam id */
            yield queryRunner.createIndex("exam_user_entity", new typeorm_1.TableIndex({
                name: "IDX_EXAM_ID",
                columnNames: ["examId"],
            }));
            /** create index with user id */
            yield queryRunner.createIndex("exam_user_entity", new typeorm_1.TableIndex({
                name: "IDX_USER_ID",
                columnNames: ["userId"],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropIndex("exam_user_entity", "IDX_EXAM_ID");
            yield queryRunner.dropIndex("exam_user_entity", "IDX_USER_ID");
            yield queryRunner.dropTable("exam_user_entity");
        });
    }
}
exports.ExamUserTableInit1695217649175 = ExamUserTableInit1695217649175;
