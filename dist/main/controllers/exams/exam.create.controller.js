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
exports.CreateExamController = void 0;
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
const validations_1 = require("../../../shared/validations");
const requiredFields_1 = require("../../../shared/validations/requiredFields");
/** define create exam controller */
class CreateExamController {
    constructor(_examsServices, _categoryServices) {
        this._examsServices = _examsServices;
        this._categoryServices = _categoryServices;
        /** execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: validation fields */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: get category id with name category */
            const getIdCategory = yield this.handleGetIdCategory(req.body.category);
            if (getIdCategory.isFailure())
                return next(getIdCategory.error);
            const { data: categoryId } = getIdCategory;
            const { userId: userId } = req.userInfor;
            /** @todo: save exams to database */
            const examCreate = Object.assign(Object.assign({}, req.body), { user: userId, category: categoryId });
            const newExam = yield this.handleCreateExam(examCreate);
            if (newExam.isFailure())
                return next(newExam.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Insert exam to database success',
                data: {
                    exam: newExam.data
                }
            });
        }));
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['title', 'category'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: get category id with name category */
        this.handleGetIdCategory = (name) => __awaiter(this, void 0, void 0, function* () {
            const itemCategory = yield this._categoryServices.getCategoryByName(name);
            if (!itemCategory)
                return (0, functions_1.failure)(new app_error_1.default('Name category not exists!', 400));
            return (0, functions_1.success)(itemCategory === null || itemCategory === void 0 ? void 0 : itemCategory.id);
        });
        /** @todo: save exams to database */
        this.handleCreateExam = (item) => __awaiter(this, void 0, void 0, function* () {
            const newItem = yield this._examsServices.create(item);
            return (0, functions_1.success)(newItem);
        });
    }
}
exports.CreateExamController = CreateExamController;
