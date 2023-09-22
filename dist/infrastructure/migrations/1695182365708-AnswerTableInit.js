"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerTableInit1695182365708 = void 0;
const typeorm_1 = require("typeorm");
class AnswerTableInit1695182365708 {
    async up(queryRunner) {
        /** create index with title */
        await queryRunner.createIndex("answers_entity", new typeorm_1.TableIndex({
            name: "IDX_ANSWER_TITLE",
            columnNames: ["title"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropIndex("answers_entity", "IDX_ANSWER_TITLE");
        await queryRunner.dropTable("answers_entity");
    }
}
exports.AnswerTableInit1695182365708 = AnswerTableInit1695182365708;
