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
exports.RolesRepositoryImpl = void 0;
const _ = __importStar(require("lodash"));
const typeorm_config_1 = __importDefault(require("../config/typeorm.config"));
/** Define role repository impl */
class RolesRepositoryImpl {
    constructor(Entity) {
        this.Entity = Entity;
        this.repository = typeorm_config_1.default.getRepository(this.Entity);
    }
    /** overding create method */
    create(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityCreate = this.repository.save(entity);
            return entityCreate;
        });
    }
    /** overiding getByUrl method */
    getByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const criterias = { where: { url: url } };
            const entity = yield this.repository.findOne(criterias);
            if (!entity)
                return undefined;
            return entity;
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
    /** overiding update method */
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const _cloneEntity = _.cloneDeep(entity);
            const _itemUpdate = _.omit(_cloneEntity, ['id']);
            yield this.repository.update(entity === null || entity === void 0 ? void 0 : entity.id, _itemUpdate);
            return entity;
        });
    }
    /** overding getAll method */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = yield this.repository.find();
            return entities;
        });
    }
    /** overding delete method */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
}
exports.RolesRepositoryImpl = RolesRepositoryImpl;
