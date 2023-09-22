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
exports.UNIQUE_USER_EMAIL_CONSTRAINT = void 0;
const typeorm_1 = require("typeorm");
const group_entity_1 = __importDefault(require("./group.entity"));
const exam_entity_1 = __importDefault(require("./exam.entity"));
const examUser_entity_1 = __importDefault(require("./examUser.entity"));
exports.UNIQUE_USER_EMAIL_CONSTRAINT = 'unique_user_email_constraint';
/** Define user entity */
let UsersEntity = class UsersEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', length: 30 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'varchar', length: 25 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40 }),
    __metadata("design:type", String)
], UsersEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, select: false }),
    __metadata("design:type", String)
], UsersEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true
    }),
    __metadata("design:type", Boolean)
], UsersEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], UsersEntity.prototype, "passwordChangedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], UsersEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'groupId',
        type: 'varchar',
        default: '46fa1172-8262-411e-85ef-8367f01be058'
    }),
    (0, typeorm_1.ManyToOne)(() => group_entity_1.default, (group) => group.users, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinTable)({
        name: 'groupId'
    }),
    __metadata("design:type", group_entity_1.default)
], UsersEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => exam_entity_1.default, (exam) => exam.user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "exams", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => examUser_entity_1.default, (examUser) => examUser.user),
    __metadata("design:type", Array)
], UsersEntity.prototype, "examUser", void 0);
UsersEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(exports.UNIQUE_USER_EMAIL_CONSTRAINT, ['email'])
], UsersEntity);
exports.default = UsersEntity;
