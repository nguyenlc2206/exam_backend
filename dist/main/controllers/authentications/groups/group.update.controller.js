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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateGroupController = void 0;
const _ = __importStar(require("lodash"));
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
const validations_1 = require("~/shared/validations");
const requiredFields_1 = require("~/shared/validations/requiredFields");
/** Define update group controller */
class UpdateGroupController {
    constructor(_groupsServices) {
        this._groupsServices = _groupsServices;
        /** define execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: validation fields */
            const validationsError = this.handleValidations(req);
            if (validationsError)
                return next(validationsError);
            /** @todo: check id, name */
            const checkIdError = await this.handleGetGroupById(req.body.id);
            if (checkIdError.isFailure())
                return next(checkIdError.error);
            /** @todo: process update group */
            const { id: _id, name: _name } = checkIdError.data;
            if (_name === req.body.name)
                return next(new app_error_1.default('Name is same with current Name!', 400));
            const _itemUpdate = await this.handleUpdateRole(checkIdError.data, req.body.name);
            if (_itemUpdate.isFailure())
                return next(_itemUpdate.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Update name to database success',
                data: {
                    item: _itemUpdate.data
                }
            });
        });
        /** @todo: validation fields */
        this.handleValidations = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['id', 'name'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: get information group by id */
        this.handleGetGroupById = async (id) => {
            const itemGet = await this._groupsServices.getById(id);
            if (!itemGet)
                return (0, functions_1.failure)(new app_error_1.default('Id role not exists!', 400));
            return (0, functions_1.success)(itemGet);
        };
        /** @todo: process update group */
        this.handleUpdateRole = async (item, name) => {
            const _cloneItem = _.cloneDeep(item);
            const _itemUpdate = {
                ..._cloneItem,
                name: name,
                updatedAt: new Date(Date.now())
            };
            const itemUpdate = await this._groupsServices.update(_itemUpdate);
            return (0, functions_1.success)(itemUpdate);
        };
    }
}
exports.UpdateGroupController = UpdateGroupController;
