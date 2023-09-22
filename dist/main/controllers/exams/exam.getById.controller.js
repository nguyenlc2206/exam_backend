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
exports.GetExamByIdController = void 0;
const app_error_1 = __importDefault(require("../../../error-handling/app.error"));
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
/** define class get exam by id */
class GetExamByIdController {
    constructor(_examService) {
        this._examService = _examService;
        /** define excute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: get exams by id */
            const examResult = yield this.handleGetExamById(req.params.id);
            if (examResult.isFailure())
                return next(examResult.error);
            /** @todo: processing response */
            res.status(200).json({
                status: 'success',
                message: 'Get exam by id from database success',
                data: {
                    exams: examResult.data
                }
            });
        }));
        /** @todo: get exams by id */
        this.handleGetExamById = (id) => __awaiter(this, void 0, void 0, function* () {
            const exam = yield this._examService.getById(id, true);
            if (!exam)
                return (0, functions_1.failure)(new app_error_1.default('Not have exam!', 400));
            return (0, functions_1.success)(exam);
        });
    }
}
exports.GetExamByIdController = GetExamByIdController;
