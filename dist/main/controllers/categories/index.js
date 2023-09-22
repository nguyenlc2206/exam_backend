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
exports.CategoryController = void 0;
const category_create_controller_1 = require("./category.create.controller");
const category_getAll_controller_1 = require("./category.getAll.controller");
/** define category controller */
class CategoryController {
    constructor(service) {
        /** create category method */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const createCategory = new category_create_controller_1.CreateCategoryController(this.service);
            return createCategory.execute(req, res, next);
        });
        /** get all category method */
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getAllCategories = new category_getAll_controller_1.GetAllCategoryController(this.service);
            return getAllCategories.execute(req, res, next);
        });
        this.service = service;
    }
}
exports.CategoryController = CategoryController;
