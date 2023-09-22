"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_create_controller_1 = require("./category.create.controller");
const category_getAll_controller_1 = require("./category.getAll.controller");
/** define category controller */
class CategoryController {
    constructor(service) {
        /** create category method */
        this.create = async (req, res, next) => {
            const createCategory = new category_create_controller_1.CreateCategoryController(this.service);
            return createCategory.execute(req, res, next);
        };
        /** get all category method */
        this.getAll = async (req, res, next) => {
            const getAllCategories = new category_getAll_controller_1.GetAllCategoryController(this.service);
            return getAllCategories.execute(req, res, next);
        };
        this.service = service;
    }
}
exports.CategoryController = CategoryController;
