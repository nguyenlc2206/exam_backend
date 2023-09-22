"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnwsersRepositoryImpl = void 0;
const typeorm_config_1 = require("../config/typeorm.config");
/** define anwsers repository implement */
class AnwsersRepositoryImpl {
    constructor(Entity) {
        this.Entity = Entity;
        this.repository = typeorm_config_1.AppDataSource.getRepository(this.Entity);
    }
    /** overiding create method */
    async create(entity) {
        const entityCreate = this.repository.save(entity);
        return entityCreate;
    }
    /** overding getByQuestionId method */
    async getByQuestionId(id) {
        const criterias = {
            where: { question: { id: id } }
        };
        const entity = await this.repository.find(criterias);
        return entity;
    }
    /** overding remove method */
    async remove(entity) {
        await this.repository.remove(entity);
    }
    /** overiding delete method */
    async delete(id) {
        await this.repository.softDelete(id);
    }
    /** overding getById method */
    async getById(id) {
        const criterias = { where: { id: id } };
        const entity = await this.repository.findOne(criterias);
        if (!entity)
            return undefined;
        return entity;
    }
}
exports.AnwsersRepositoryImpl = AnwsersRepositoryImpl;
