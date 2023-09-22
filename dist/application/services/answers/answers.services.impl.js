"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnwsersServicesImpl = void 0;
/** define anwsers services implement */
class AnwsersServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overiding create method */
    async create(entity) {
        const response = await this.repository.create(entity);
        return response;
    }
    /** overding getByQuestionId method */
    async getByQuestionId(id) {
        const response = await this.repository.getByQuestionId(id);
        return response;
    }
    /** overding remove method */
    async remove(entity) {
        await this.repository.remove(entity);
    }
    /** overding delete method */
    async delete(id) {
        await this.repository.delete(id);
    }
    /** overiding getById method */
    async getById(id) {
        const response = await this.repository.getById(id);
        return response;
    }
}
exports.AnwsersServicesImpl = AnwsersServicesImpl;
