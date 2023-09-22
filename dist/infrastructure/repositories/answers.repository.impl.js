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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnwsersRepositoryImpl = void 0;
const typeorm_config_1 = __importDefault(require("../config/typeorm.config"));
/** define anwsers repository implement */
class AnwsersRepositoryImpl {
    constructor(Entity) {
        this.Entity = Entity;
        this.repository = typeorm_config_1.default.getRepository(this.Entity);
    }
    /** overiding create method */
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityCreate = this.repository.save(entity);
            return entityCreate;
        });
    }
    /** overding getByQuestionId method */
    getByQuestionId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const criterias = {
                where: { question: { id: id } }
            };
            const entity = yield this.repository.find(criterias);
            return entity;
        });
    }
    /** overding remove method */
    remove(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.remove(entity);
        });
    }
    /** overiding delete method */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.softDelete(id);
        });
    }
    /** overding getById method */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const criterias = { where: { id: id } };
            const entity = yield this.repository.findOne(criterias);
            if (!entity)
                return undefined;
            return entity;
        });
    }
}
exports.AnwsersRepositoryImpl = AnwsersRepositoryImpl;
