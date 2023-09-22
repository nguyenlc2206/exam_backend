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
exports.GetAllExamsWithAdminController = void 0;
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
/** define getAll exams of user controller */
class GetAllExamsWithAdminController {
    constructor(_examUserService) {
        this._examUserService = _examUserService;
        /** define excute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: get all exams by user id */
            const listExamsResult = yield this.handleGetAllExamsByAdmin();
            if (listExamsResult.isFailure())
                return next(listExamsResult.error);
            /** @todo: processing response */
            res.status(200).json({
                status: 'success',
                message: 'Get all exams of user from database success',
                data: {
                    exams: listExamsResult.data
                }
            });
        }));
        /** @todo: get all exams by user id */
        this.handleGetAllExamsByAdmin = () => __awaiter(this, void 0, void 0, function* () {
            const listExams = yield this._examUserService.getAllExamsByAdmin();
            if (!listExams)
                return (0, functions_1.failure)(new app_error_1.default('Not have exams!', 400));
            return (0, functions_1.success)(listExams);
        });
    }
}
exports.GetAllExamsWithAdminController = GetAllExamsWithAdminController;
