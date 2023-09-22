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
const user_entity_1 = __importDefault(require("./user.entity"));
const exam_category_entity_1 = __importDefault(require("./exam.category.entity"));
const examUser_entity_1 = __importDefault(require("./examUser.entity"));
const question_entity_1 = __importDefault(require("./question.entity"));
/** Define exam entity */
let ExamsEntity = class ExamsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ExamsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], ExamsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar' }),
    __metadata("design:type", String)
], ExamsEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true
    }),
    __metadata("design:type", Boolean)
], ExamsEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], ExamsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], ExamsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ExamsEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, (user) => user.exams, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'userId'
    }),
    __metadata("design:type", user_entity_1.default)
], ExamsEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => exam_category_entity_1.default, (user) => user.exams, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'categoryId'
    }),
    __metadata("design:type", exam_category_entity_1.default)
], ExamsEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => examUser_entity_1.default, (examUser) => examUser.exam),
    __metadata("design:type", Array)
], ExamsEntity.prototype, "examUser", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => question_entity_1.default, (question) => question.exam),
    __metadata("design:type", Array)
], ExamsEntity.prototype, "questions", void 0);
ExamsEntity = __decorate([
    (0, typeorm_1.Entity)()
], ExamsEntity);
exports.default = ExamsEntity;
