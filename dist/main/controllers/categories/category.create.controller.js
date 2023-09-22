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
exports.CreateCategoryController = void 0;
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
const validations_1 = require("../../../shared/validations");
const requiredFields_1 = require("../../../shared/validations/requiredFields");
/** Define create category controller */
class CreateCategoryController {
    constructor(_categoryService) {
        this._categoryService = _categoryService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: check name exists */
            const checkNameResult = yield this.hanleCheckNameExists(req.body.name);
            if (checkNameResult.isFailure())
                return next(checkNameResult.error);
            /** @todo: save category to database */
            const newCategory = yield this.handleCreateCategory(req.body);
            if (newCategory.isFailure())
                return next(newCategory.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Insert category to database success',
                data: {
                    item: newCategory.data
                }
            });
        }));
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['name'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: check name exists */
        this.hanleCheckNameExists = (name) => __awaiter(this, void 0, void 0, function* () {
            const userFinded = yield this._categoryService.getCategoryByName(name);
            if (userFinded)
                return (0, functions_1.failure)(new app_error_1.default('Name is already in database!', 400));
            return (0, functions_1.success)(userFinded);
        });
        /** @todo: save category to database */
        this.handleCreateCategory = (item) => __awaiter(this, void 0, void 0, function* () {
            const newItem = yield this._categoryService.create(item);
            return (0, functions_1.success)(newItem);
        });
    }
}
exports.CreateCategoryController = CreateCategoryController;
