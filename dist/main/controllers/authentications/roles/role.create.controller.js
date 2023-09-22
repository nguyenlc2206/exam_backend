"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoleController = void 0;
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
const validations_1 = require("~/shared/validations");
const requiredFields_1 = require("~/shared/validations/requiredFields");
/** Define create role controller */
class CreateRoleController {
    constructor(_roleService) {
        this._roleService = _roleService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: validation field */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: check url role is not exists */
            const checkUrlRoleError = await this.handleCheckUrl(req.body.url);
            if (checkUrlRoleError.isFailure())
                return next(checkUrlRoleError.error);
            /** @todo: save url roles to database */
            const newItem = await this.handleCreateRole(req.body);
            if (newItem.isFailure())
                return next(newItem.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Insert url to database success',
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
            const fields = ['url'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: check url role is not exists */
        this.handleCheckUrl = async (url) => {
            const urlFinded = await this._roleService.getByUrl(url);
            if (urlFinded)
                return (0, functions_1.failure)(new app_error_1.default('Url is already!', 400));
            return (0, functions_1.success)(urlFinded);
        };
        /** @todo: save url roles to database */
        this.handleCreateRole = async (item) => {
            const newItem = await this._roleService.create(item);
            return (0, functions_1.success)(newItem);
        };
    }
}
exports.CreateRoleController = CreateRoleController;
