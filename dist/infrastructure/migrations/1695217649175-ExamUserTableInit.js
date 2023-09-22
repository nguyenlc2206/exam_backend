"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamUserTableInit1695217649175 = void 0;
const typeorm_1 = require("typeorm");
class ExamUserTableInit1695217649175 {
    async up(queryRunner) {
        /** create index with exam id */
        await queryRunner.createIndex("exam_user_entity", new typeorm_1.TableIndex({
            name: "IDX_EXAM_ID",
            columnNames: ["examId"],
        }));
        /** create index with user id */
        await queryRunner.createIndex("exam_user_entity", new typeorm_1.TableIndex({
            name: "IDX_USER_ID",
            columnNames: ["userId"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("exam_user_entity", "IDX_EXAM_ID");
        await queryRunner.dropIndex("exam_user_entity", "IDX_USER_ID");
        await queryRunner.dropTable("exam_user_entity");
    }
}
exports.ExamUserTableInit1695217649175 = ExamUserTableInit1695217649175;
