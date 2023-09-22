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
exports.UpdateRoleController = void 0;
const _ = __importStar(require("lodash"));
const app_error_1 = __importDefault(require("../../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../../shared/catch-async"));
const functions_1 = require("../../../../shared/functions");
const validations_1 = require("../../../../shared/validations");
const requiredFields_1 = require("../../../../shared/validations/requiredFields");
/** Define update role controller */
class UpdateRoleController {
    constructor(_roleService) {
        this._roleService = _roleService;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: validation fields */
            const validationsError = this.handleValidations(req);
            if (validationsError)
                return next(validationsError);
            /** @todo: check id, url */
            const checkIdError = yield this.handleGetRoleById(req.body.id);
            if (checkIdError.isFailure())
                return next(checkIdError.error);
            // console.log(">>>Check checkIdError:", checkIdError.data);
            /** @todo: process update role */
            const { id: _id, url: _url } = checkIdError.data;
            if (_url === req.body.url)
                return next(new app_error_1.default('Url is same with current url!', 400));
            const _itemUpdate = yield this.handleUpdateRole(checkIdError.data, req.body.url);
            if (_itemUpdate.isFailure())
                return next(_itemUpdate.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Update url to database success',
                data: {
                    item: _itemUpdate.data
                }
            });
        }));
        /** @todo: validation fields */
        this.handleValidations = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['id', 'url'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: get information role by id */
        this.handleGetRoleById = (id) => __awaiter(this, void 0, void 0, function* () {
            const itemGet = yield this._roleService.getById(id);
            if (!itemGet)
                return (0, functions_1.failure)(new app_error_1.default('Id role not exists!', 400));
            return (0, functions_1.success)(itemGet);
        });
        /** @todo: process update role */
        this.handleUpdateRole = (item, url) => __awaiter(this, void 0, void 0, function* () {
            const _cloneItem = _.cloneDeep(item);
            const _itemUpdate = Object.assign(Object.assign({}, _cloneItem), { url: url, updatedAt: new Date(Date.now()) });
            const itemUpdate = yield this._roleService.update(_itemUpdate);
            return (0, functions_1.success)(itemUpdate);
        });
    }
}
exports.UpdateRoleController = UpdateRoleController;
