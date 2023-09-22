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
exports.GetAllExamsController = void 0;
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
/** define class getAll Exam controller */
class GetAllExamsController {
    constructor(_examsServices) {
        this._examsServices = _examsServices;
        /** define execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: getAll exams */
            const listExamsResult = yield this.handleGetAllExams();
            if (listExamsResult.isFailure())
                return next(listExamsResult.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Get list exams success',
                data: {
                    items: listExamsResult.data
                }
            });
        }));
        /** @todo: getAll exams */
        this.handleGetAllExams = () => __awaiter(this, void 0, void 0, function* () {
            const listAllCategories = yield this._examsServices.getAll();
            return (0, functions_1.success)(listAllCategories);
        });
    }
}
exports.GetAllExamsController = GetAllExamsController;
