"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRelationUserController = void 0;
const exam_user_create_controller_1 = require("./exam.user.create.controller");
const exam_user_getAll_admin_controller_1 = require("./exam.user.getAll.admin.controller");
const exam_user_getAll_userId_controller_1 = require("./exam.user.getAll.userId.controller");
/** define exam relation user controller */
class ExamRelationUserController {
    constructor(examsServices, userService, examUserService) {
        /** create exam method */
        this.create = async (req, res, next) => {
            const createExamUser = new exam_user_create_controller_1.CreateExamRelationUserController(this.examsServices, this.userService, this.examUserService);
            return createExamUser.execute(req, res, next);
        };
        /** getAll exam by userId method */
        this.getAllByUserId = async (req, res, next) => {
            const getAllExamsById = new exam_user_getAll_userId_controller_1.GetAllExamsWithUserIdController(this.examUserService);
            return getAllExamsById.execute(req, res, next);
        };
        /** getAll exam by admin method */
        this.getAllByAdmin = async (req, res, next) => {
            const getAllExamsByAdmin = new exam_user_getAll_admin_controller_1.GetAllExamsWithAdminController(this.examUserService);
            return getAllExamsByAdmin.execute(req, res, next);
        };
        this.examsServices = examsServices;
        this.userService = userService;
        this.examUserService = examUserService;
    }
}
exports.ExamRelationUserController = ExamRelationUserController;
