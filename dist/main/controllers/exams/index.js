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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamsController = void 0;
const exam_create_controller_1 = require("./exam.create.controller");
const exam_getAll_controller_1 = require("./exam.getAll.controller");
const exam_getById_controller_1 = require("./exam.getById.controller");
const exam_update_controller_1 = require("./exam.update.controller");
/** define exams controller */
class ExamsController {
    constructor(exmaService, categoryService) {
        /** create exam method */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const createExam = new exam_create_controller_1.CreateExamController(this.exmaService, this.categoryService);
            return createExam.execute(req, res, next);
        });
        /** create exam method */
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const updateExam = new exam_update_controller_1.UpdateExamController(this.exmaService);
            return updateExam.execute(req, res, next);
        });
        /** getAll exam method */
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getAllExams = new exam_getAll_controller_1.GetAllExamsController(this.exmaService);
            return getAllExams.execute(req, res, next);
        });
        /** get exam by id method */
        this.getExamById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getExam = new exam_getById_controller_1.GetExamByIdController(this.exmaService);
            return getExam.execute(req, res, next);
        });
        this.exmaService = exmaService;
        this.categoryService = categoryService;
    }
}
exports.ExamsController = ExamsController;
