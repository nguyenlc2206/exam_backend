"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRelationUserServicesImpl = void 0;
/** define exam user services implement */
class ExamRelationUserServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overding create method */
    async create(entity) {
        const response = await this.repository.create(entity);
        return response;
    }
    /** overding getAllExamsByUserId method */
    async getAllExamsByUserId(id) {
        const response = await this.repository.getAllExamsByUserId(id);
        return response;
    }
    /** overding getAllExamsByAdmin method */
    async getAllExamsByAdmin() {
        const response = await this.repository.getAllExamsByAdmin();
        return response;
    }
}
exports.ExamRelationUserServicesImpl = ExamRelationUserServicesImpl;
