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
const groupRole_entity_1 = __importDefault(require("./groupRole.entity"));
const user_entity_1 = __importDefault(require("./user.entity"));
/** Define group entity */
let GroupsEntity = class GroupsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GroupsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 25,
        unique: true
    }),
    __metadata("design:type", String)
], GroupsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], GroupsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], GroupsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], GroupsEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => groupRole_entity_1.default, (groupRole) => groupRole.group),
    __metadata("design:type", Array)
], GroupsEntity.prototype, "groupsRoles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.default, (user) => user.group),
    __metadata("design:type", Array)
], GroupsEntity.prototype, "users", void 0);
GroupsEntity = __decorate([
    (0, typeorm_1.Entity)()
], GroupsEntity);
exports.default = GroupsEntity;
