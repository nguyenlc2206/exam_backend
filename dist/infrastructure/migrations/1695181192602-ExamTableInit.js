"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamTableInit1695181192602 = void 0;
const typeorm_1 = require("typeorm");
class ExamTableInit1695181192602 {
    async up(queryRunner) {
        /** create index with title */
        await queryRunner.createIndex("exams_entity", new typeorm_1.TableIndex({
            name: "IDX_EXAM_TITLE",
            columnNames: ["title"],
        }));
        /** create index with status */
        await queryRunner.createIndex("exams_entity", new typeorm_1.TableIndex({
            name: "IDX_EXAM_STATUS",
            columnNames: ["status"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("exams_entity", "IDX_EXAM_TITLE");
        await queryRunner.dropIndex("exams_entity", "IDX_EXAM_STATUS");
        await queryRunner.dropTable("exams_entity");
    }
}
exports.ExamTableInit1695181192602 = ExamTableInit1695181192602;
