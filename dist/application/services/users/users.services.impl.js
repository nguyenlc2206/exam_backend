"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersServicesImpl = void 0;
/** Define users services implement */
class UsersServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overiding create method */
    async create(entity) {
        const response = await this.repository.create(entity);
        return response;
    }
    /** overiding getUserByEmail method */
    async getUserByEmail(email, relations) {
        const response = await this.repository.getUserByEmail(email, relations);
        return response;
    }
    /** overiding update method */
    async update(entity) {
        const response = await this.repository.update(entity);
        return response;
    }
    /** overiding getUserById method */
    async getUserById(id, relations) {
        const response = await this.repository.getUserById(id, relations);
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
    /** overiding restore method */
    async restore(id) {
        const response = await this.repository.restore(id);
        return response;
    }
}
exports.UsersServicesImpl = UsersServicesImpl;
