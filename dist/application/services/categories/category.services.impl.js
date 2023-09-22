"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServicesImpl = void 0;
/** Deinf category services implement */
class CategoryServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overiding create method */
    async create(entity) {
        const response = await this.repository.create(entity);
        return response;
    }
    /** overiding getCategoryByName method */
    async getCategoryByName(name) {
        const response = await this.repository.getCategoryByName(name);
        return response;
    }
    /** overding getAll method */
    async getAll() {
        const response = await this.repository.getAll();
        return response;
    }
}
exports.CategoryServicesImpl = CategoryServicesImpl;
