"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionTableInit1695181612280 = void 0;
const typeorm_1 = require("typeorm");
class QuestionTableInit1695181612280 {
    async up(queryRunner) {
        /** create index with status */
        await queryRunner.createIndex("questions_entity", new typeorm_1.TableIndex({
            name: "IDX_QUESTION_STATUS",
            columnNames: ["status"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("questions_entity", "IDX_QUESTION_STATUS");
        await queryRunner.dropTable("questions_entity");
    }
}
exports.QuestionTableInit1695181612280 = QuestionTableInit1695181612280;
