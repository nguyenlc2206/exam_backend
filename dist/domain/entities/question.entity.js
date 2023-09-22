"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const exam_entity_1 = __importDefault(require("./exam.entity"));
const answer_entity_1 = __importDefault(require("./answer.entity"));
/** Define question entity */
let QuestionsEntity = class QuestionsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], QuestionsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], QuestionsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], QuestionsEntity.prototype, "subTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], QuestionsEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true
    }),
    __metadata("design:type", Boolean)
], QuestionsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], QuestionsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], QuestionsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], QuestionsEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_entity_1.default, (exam) => exam.questions, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'examId'
    }),
    __metadata("design:type", exam_entity_1.default)
], QuestionsEntity.prototype, "exam", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.default, (answer) => answer.question),
    __metadata("design:type", Array)
], QuestionsEntity.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'uuid' }),
    __metadata("design:type", String)
], QuestionsEntity.prototype, "answerCorrectId", void 0);
QuestionsEntity = __decorate([
    (0, typeorm_1.Entity)()
], QuestionsEntity);
exports.default = QuestionsEntity;
