"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRelationUserRepositoryImpl = void 0;
const typeorm_config_1 = require("../config/typeorm.config");
/** define exam relation with user repository implement */
class ExamRelationUserRepositoryImpl {
    constructor(Entity) {
        this.Entity = Entity;
        this.repository = typeorm_config_1.AppDataSource.getRepository(this.Entity);
    }
    /** overiding create method */
    async create(entity) {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }
    /** overiding getAllExamsByUserId method */
    async getAllExamsByUserId(id) {
        const criterias = {
            where: { user: { id: id } },
            relations: { exam: true }
        };
        const entity = await this.repository.find(criterias);
        if (entity.length === 0)
            return undefined;
        return entity;
    }
    /** overiding getAllExamsByAdmin method */
    async getAllExamsByAdmin() {
        const criterias = {
            relations: {
                exam: true,
                user: true
            },
            withDeleted: true
        };
        const entity = await this.repository.find(criterias);
        if (entity.length === 0)
            return undefined;
        return entity;
    }
}
exports.ExamRelationUserRepositoryImpl = ExamRelationUserRepositoryImpl;
