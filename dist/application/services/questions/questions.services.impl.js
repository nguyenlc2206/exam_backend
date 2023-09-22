"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsServicesImpl = void 0;
/** define questions service implement */
class QuestionsServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overiding create method */
    async create(entity) {
        const response = await this.repository.create(entity);
        return response;
    }
    /** overding delete method */
    async delete(id) {
        await this.repository.delete(id);
    }
    /** overiding getUserById method */
    async getById(id, relations) {
        const response = await this.repository.getById(id, relations);
        return response;
    }
    /** overding getAll method */
    async getAll() {
        const response = await this.repository.getAll();
        return response;
    }
    /** overiding update method */
    async update(entity) {
        const response = await this.repository.update(entity);
        return response;
    }
}
exports.QuestionsServicesImpl = QuestionsServicesImpl;
