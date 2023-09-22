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
exports.ExamTableInit1695181192602 = void 0;
const typeorm_1 = require("typeorm");
class ExamTableInit1695181192602 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /** create index with title */
            yield queryRunner.createIndex("exams_entity", new typeorm_1.TableIndex({
                name: "IDX_EXAM_TITLE",
                columnNames: ["title"],
            }));
            /** create index with status */
            yield queryRunner.createIndex("exams_entity", new typeorm_1.TableIndex({
                name: "IDX_EXAM_STATUS",
                columnNames: ["status"],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropIndex("exams_entity", "IDX_EXAM_TITLE");
            yield queryRunner.dropIndex("exams_entity", "IDX_EXAM_STATUS");
            yield queryRunner.dropTable("exams_entity");
        });
    }
}
exports.ExamTableInit1695181192602 = ExamTableInit1695181192602;
