"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepositoryImpl = void 0;
const _ = __importStar(require("lodash"));
const typeorm_config_1 = require("../config/typeorm.config");
/** Define repository users implement */
class UsersRepositoryImpl {
    constructor(Entity) {
        this.Entity = Entity;
        this.repository = typeorm_config_1.AppDataSource.getRepository(this.Entity);
    }
    /** overding create method */
    async create(entity) {
        const entityCreate = await this.repository.save(entity);
        return entityCreate;
    }
    /** overiding getUserByEmail method */
    async getUserByEmail(email, relations) {
        let criterias = {
            where: { email: email },
            select: {
                password: true,
                id: true,
                username: true,
                phoneNumber: true,
                email: true,
                status: true,
                group: true,
                passwordChangedAt: true,
                updatedAt: true,
                deletedAt: true
            },
            withDeleted: true
        };
        if (relations)
            criterias = {
                ...criterias,
                relations: ['group']
            };
        const entity = await this.repository.findOne(criterias);
        if (!entity)
            return undefined;
        return entity;
    }
    /** overiding update method */
    async update(entity) {
        const _cloneEntity = _.cloneDeep(entity);
        const _itemUpdate = _.omit(_cloneEntity, ['id']);
        await this.repository.update(entity === null || entity === void 0 ? void 0 : entity.id, _itemUpdate);
        return entity;
    }
    /** overiding getUserById method */
    async getUserById(id, relations) {
        let criterias = {
            where: { id: id },
            select: {
                password: true,
                id: true,
                username: true,
                phoneNumber: true,
                email: true,
                status: true,
                group: true,
                passwordChangedAt: true,
                updatedAt: true,
                deletedAt: true
            },
            withDeleted: true
        };
        if (relations)
            criterias = {
                ...criterias,
                relations: ['group']
            };
        const entity = await this.repository.findOne(criterias);
        if (!entity)
            return undefined;
        return entity;
    }
    /** overding getAll method */
    async getAll() {
        const entities = await this.repository.find({
            relations: ['group'],
            withDeleted: true
        });
        return entities;
    }
    /** overiding delete method */
    async delete(id) {
        await this.repository.softDelete(id);
    }
    /** overiding restore method */
    async restore(id) {
        const entityRestore = await this.repository.restore(id);
        return entityRestore;
    }
}
exports.UsersRepositoryImpl = UsersRepositoryImpl;
