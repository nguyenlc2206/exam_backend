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
const group_entity_1 = __importDefault(require("./group.entity"));
const role_entity_1 = __importDefault(require("./role.entity"));
/** Define group role entity */
let GroupsRolesEntity = class GroupsRolesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], GroupsRolesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], GroupsRolesEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP(7)'
    }),
    __metadata("design:type", Date)
], GroupsRolesEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], GroupsRolesEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => group_entity_1.default, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)({
        name: 'groupId'
    }),
    __metadata("design:type", group_entity_1.default)
], GroupsRolesEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.default, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)({
        name: 'roleId'
    }),
    __metadata("design:type", role_entity_1.default)
], GroupsRolesEntity.prototype, "role", void 0);
GroupsRolesEntity = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['group', 'role'])
], GroupsRolesEntity);
exports.default = GroupsRolesEntity;
