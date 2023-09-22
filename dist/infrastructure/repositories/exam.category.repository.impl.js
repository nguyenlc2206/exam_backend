"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsCategoryRepositoryImpl = void 0;
const typeorm_config_1 = require("../config/typeorm.config");
/** define exam category repository implement */
class ExamsCategoryRepositoryImpl {
    constructor(Entity) {
        this.Entity = Entity;
        this.repository = typeorm_config_1.AppDataSource.getRepository(this.Entity);
    }
    /** overiding create method */
    async create(entity) {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }
    /** overiding getCategoryByName method */
    async getCategoryByName(name) {
        const criterias = { where: { name: name } };
        const entity = await this.repository.findOne(criterias);
        if (!entity)
            return undefined;
        return entity;
    }
    /** overiding getAll method */
    async getAll() {
        const entities = await this.repository.find();
        return entities;
    }
}
exports.ExamsCategoryRepositoryImpl = ExamsCategoryRepositoryImpl;
