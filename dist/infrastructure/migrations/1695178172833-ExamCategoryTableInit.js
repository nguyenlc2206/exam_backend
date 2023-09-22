"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamCategoryTableInit1695178172833 = void 0;
const typeorm_1 = require("typeorm");
class ExamCategoryTableInit1695178172833 {
    async up(queryRunner) {
        /** create index with name */
        await queryRunner.createIndex('exams_category_entity', new typeorm_1.TableIndex({
            name: 'IDX_EXAM_CATEGORY_NAME',
            columnNames: ['name']
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex('exams_category_entity', 'IDX_EXAM_CATEGORY_NAME');
        await queryRunner.dropTable('exams_category_entity');
    }
}
exports.ExamCategoryTableInit1695178172833 = ExamCategoryTableInit1695178172833;
