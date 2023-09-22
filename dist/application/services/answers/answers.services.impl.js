"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnwsersServicesImpl = void 0;
/** define anwsers services implement */
class AnwsersServicesImpl {
    constructor(repository) {
        this.repository = repository;
    }
    /** overiding create method */
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.create(entity);
            return response;
        });
    }
    /** overding getByQuestionId method */
    getByQuestionId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.getByQuestionId(id);
            return response;
        });
    }
    /** overding remove method */
    remove(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.remove(entity);
        });
    }
    /** overding delete method */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
    /** overiding getById method */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.getById(id);
            return response;
        });
    }
}
exports.AnwsersServicesImpl = AnwsersServicesImpl;
