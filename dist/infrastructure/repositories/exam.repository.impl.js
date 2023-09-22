"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ExamsRepositoryImpl = void 0;
const _ = __importStar(require("lodash"));
const typeorm_config_1 = __importDefault(require("../config/typeorm.config"));
/** define exam repository implement */
class ExamsRepositoryImpl {
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
    /** overiding update method */
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const _cloneEntity = _.cloneDeep(entity);
            const _itemUpdate = _.omit(_cloneEntity, ['id']);
            yield this.repository.update(entity === null || entity === void 0 ? void 0 : entity.id, _itemUpdate);
            return entity;
        });
    }
    /** overiding getById method */
    getById(id, relations) {
        return __awaiter(this, void 0, void 0, function* () {
            let criterias = { where: { id: id } };
            if (relations)
                criterias = Object.assign(Object.assign({}, criterias), { relations: ['questions'] });
            const entity = yield this.repository.findOne(criterias);
            if (!entity)
                return undefined;
            return entity;
        });
    }
    /** overiding getAll method */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.repository.find({
                relations: ['questions']
            });
            return entities;
        });
    }
}
exports.ExamsRepositoryImpl = ExamsRepositoryImpl;
