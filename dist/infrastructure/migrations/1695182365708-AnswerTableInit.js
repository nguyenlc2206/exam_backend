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
exports.AnswerTableInit1695182365708 = void 0;
const typeorm_1 = require("typeorm");
class AnswerTableInit1695182365708 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            /** create index with title */
            yield queryRunner.createIndex("answers_entity", new typeorm_1.TableIndex({
                name: "IDX_ANSWER_TITLE",
                columnNames: ["title"],
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropIndex("answers_entity", "IDX_ANSWER_TITLE");
            yield queryRunner.dropTable("answers_entity");
        });
    }
}
exports.AnswerTableInit1695182365708 = AnswerTableInit1695182365708;
