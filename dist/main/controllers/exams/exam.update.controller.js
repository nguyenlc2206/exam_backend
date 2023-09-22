"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateExamController = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
const validations_1 = require("~/shared/validations");
const requiredFields_1 = require("~/shared/validations/requiredFields");
/** define update exam controller */
class UpdateExamController {
    constructor(_examsServices) {
        this._examsServices = _examsServices;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: validation fields */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: get exam by id */
            const examGetResult = await this.handleGetExamById(req.body.id);
            if (examGetResult.isFailure())
                return next(examGetResult.error);
            /** @todo: process update exam */
            const updateExamResult = await this.handleUpdateExam(req.body);
            if (updateExamResult.isFailure())
                return next(updateExamResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Update exam to database success',
                data: {}
            });
        });
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['id'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: get exam by id */
        this.handleGetExamById = async (id) => {
            const examFinded = await this._examsServices.getById(id);
            if (!examFinded)
                return (0, functions_1.failure)(new app_error_1.default('Exam id is not exists!', 400));
            return (0, functions_1.success)(examFinded);
        };
        /** @todo: process update exam */
        this.handleUpdateExam = async (item) => {
            const itemUpdate = await this._examsServices.update(item);
            return (0, functions_1.success)(itemUpdate);
        };
    }
}
exports.UpdateExamController = UpdateExamController;
