"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGroupController = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
const validations_1 = require("~/shared/validations");
const requiredFields_1 = require("~/shared/validations/requiredFields");
/** define create groups controller */
class CreateGroupController {
    constructor(_groupsServices) {
        this._groupsServices = _groupsServices;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: check name groups is not exists */
            const checkNameGroupError = await this.handleCheckName(req.body.name);
            if (checkNameGroupError.isFailure())
                return next(checkNameGroupError.error);
            /** @todo: save name groups to database */
            const newItem = await this.handleCreateGroup(req.body);
            if (newItem.isFailure())
                return next(newItem.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Insert name goup database success',
                data: {
                    item: newItem.data
                }
            });
        });
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
        /** @todo: check name groups is not exists */
        this.handleCheckName = async (name) => {
            const urlFinded = await this._groupsServices.getByName(name);
            if (urlFinded)
                return (0, functions_1.failure)(new app_error_1.default(`Name ${name} is already!`, 400));
            return (0, functions_1.success)(urlFinded);
        };
        /** @todo: save name groups to database */
        this.handleCreateGroup = async (item) => {
            const newItem = await this._groupsServices.create(item);
            return (0, functions_1.success)(newItem);
        };
    }
}
exports.CreateGroupController = CreateGroupController;
