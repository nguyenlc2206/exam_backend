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
exports.ExamRelationUserController = void 0;
const exam_user_create_controller_1 = require("./exam.user.create.controller");
const exam_user_getAll_admin_controller_1 = require("./exam.user.getAll.admin.controller");
const exam_user_getAll_userId_controller_1 = require("./exam.user.getAll.userId.controller");
/** define exam relation user controller */
class ExamRelationUserController {
    constructor(examsServices, userService, examUserService) {
        /** create exam method */
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const createExamUser = new exam_user_create_controller_1.CreateExamRelationUserController(this.examsServices, this.userService, this.examUserService);
            return createExamUser.execute(req, res, next);
        });
        /** getAll exam by userId method */
        this.getAllByUserId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getAllExamsById = new exam_user_getAll_userId_controller_1.GetAllExamsWithUserIdController(this.examUserService);
            return getAllExamsById.execute(req, res, next);
        });
        /** getAll exam by admin method */
        this.getAllByAdmin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getAllExamsByAdmin = new exam_user_getAll_admin_controller_1.GetAllExamsWithAdminController(this.examUserService);
            return getAllExamsByAdmin.execute(req, res, next);
        });
        this.examsServices = examsServices;
        this.userService = userService;
        this.examUserService = examUserService;
    }
}
exports.ExamRelationUserController = ExamRelationUserController;
