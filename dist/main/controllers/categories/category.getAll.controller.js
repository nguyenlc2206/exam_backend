"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategoryController = void 0;
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
/** defind getAll controller */
class GetAllCategoryController {
    constructor(_categorySevices) {
        this._categorySevices = _categorySevices;
        /** @todo: execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: getAll category */
            const listCategoriesResult = await this.handleGetAllCategory();
            if (listCategoriesResult.isFailure())
                return next(listCategoriesResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Get list category success',
                data: {
                    items: listCategoriesResult.data
                }
            });
        });
        /** @todo: getAll category */
        this.handleGetAllCategory = async () => {
            const listAllCategories = await this._categorySevices.getAll();
            return (0, functions_1.success)(listAllCategories);
        };
    }
}
exports.GetAllCategoryController = GetAllCategoryController;
