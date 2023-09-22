"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsServicesImpl = void 0;
/** define exam services implement */
class ExamsServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overiding create method */
    async create(entity) {
        const response = await this.repository.create(entity);
        return response;
    }
    /** overiding update method */
    async update(entity) {
        const response = await this.repository.update(entity);
        return response;
    }
    /** overiding getById method */
    async getById(id, relations) {
        const response = await this.repository.getById(id, relations);
        return response;
    }
    /** overding getAll method */
    async getAll() {
        const response = await this.repository.getAll();
        return response;
    }
}
exports.ExamsServicesImpl = ExamsServicesImpl;
