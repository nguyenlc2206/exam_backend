"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleServicesImpl = void 0;
/** Implement roles services */
class RoleServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overiding create method */
    async create(entity) {
        const response = await this.repository.create(entity);
        return response;
    }
    /** overiding getByUrl method */
    async getByUrl(url) {
        const response = await this.repository.getByUrl(url);
        return response;
    }
    /** overiding getById method */
    async getById(id) {
        const response = await this.repository.getById(id);
        return response;
    }
    /** overiding update method */
    async update(entity) {
        const response = await this.repository.update(entity);
        return response;
    }
    /** overding getAll method */
    async getAll() {
        const response = await this.repository.getAll();
        return response;
    }
    /** overding delete method */
    async delete(id) {
        await this.repository.delete(id);
    }
}
exports.RoleServicesImpl = RoleServicesImpl;
