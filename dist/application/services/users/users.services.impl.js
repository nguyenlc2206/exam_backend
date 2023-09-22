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
exports.UsersServicesImpl = void 0;
/** Define users services implement */
class UsersServicesImpl {
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
    /** overiding getUserByEmail method */
    getUserByEmail(email, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.getUserByEmail(email, relations);
            return response;
        });
    }
    /** overiding update method */
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.update(entity);
            return response;
        });
    }
    /** overiding getUserById method */
    getUserById(id, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.getUserById(id, relations);
            return response;
        });
    }
    /** overding getAll method */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.getAll();
            return response;
        });
    }
    /** overding delete method */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
    /** overiding restore method */
    restore(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.repository.restore(id);
            return response;
        });
    }
}
exports.UsersServicesImpl = UsersServicesImpl;
