"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupsServicesImpl = void 0;
/** Define groups services implement */
class GroupsServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overiding create method */
    async create(entity) {
        const response = await this.repository.create(entity);
        return response;
    }
    /** overiding getByName method */
    async getByName(name) {
        const response = await this.repository.getByName(name);
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
}
exports.GroupsServicesImpl = GroupsServicesImpl;
