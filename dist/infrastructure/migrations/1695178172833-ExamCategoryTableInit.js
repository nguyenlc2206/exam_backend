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
exports.ExamCategoryTableInit1695178172833 = void 0;
const typeorm_1 = require("typeorm");
class ExamCategoryTableInit1695178172833 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /** create index with name */
            yield queryRunner.createIndex('exams_category_entity', new typeorm_1.TableIndex({
                name: 'IDX_EXAM_CATEGORY_NAME',
                columnNames: ['name']
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropIndex('exams_category_entity', 'IDX_EXAM_CATEGORY_NAME');
            yield queryRunner.dropTable('exams_category_entity');
        });
    }
}
exports.ExamCategoryTableInit1695178172833 = ExamCategoryTableInit1695178172833;
