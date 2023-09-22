"use strict";
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
        this.create = async (req, res, next) => {
            const createExam = new exam_create_controller_1.CreateExamController(this.exmaService, this.categoryService);
            return createExam.execute(req, res, next);
        };
        /** create exam method */
        this.update = async (req, res, next) => {
            const updateExam = new exam_update_controller_1.UpdateExamController(this.exmaService);
            return updateExam.execute(req, res, next);
        };
        /** getAll exam method */
        this.getAll = async (req, res, next) => {
            const getAllExams = new exam_getAll_controller_1.GetAllExamsController(this.exmaService);
            return getAllExams.execute(req, res, next);
        };
        /** get exam by id method */
        this.getExamById = async (req, res, next) => {
            const getExam = new exam_getById_controller_1.GetExamByIdController(this.exmaService);
            return getExam.execute(req, res, next);
        };
        this.exmaService = exmaService;
        this.categoryService = categoryService;
    }
}
exports.ExamsController = ExamsController;
