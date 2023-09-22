"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExamRelationUserController = void 0;
const examUser_entity_1 = __importDefault(require("~/domain/entities/examUser.entity"));
const app_error_1 = __importDefault(require("~/error-handling/app.error"));
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
const validations_1 = require("~/shared/validations");
const requiredFields_1 = require("~/shared/validations/requiredFields");
/** Define exam relation with user controller */
class CreateExamRelationUserController {
    constructor(_examsServices, _userService, _examUserService) {
        this._examsServices = _examsServices;
        this._userService = _userService;
        this._examUserService = _examUserService;
        /** execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: validation fields */
            const validationError = this.handleValidation(req);
            if (validationError)
                return next(validationError);
            /** @todo: check id user exists */
            const checkIdUserResult = await this.handleCheckIdUser(req.body.userId);
            if (checkIdUserResult.isFailure())
                return next(checkIdUserResult.error);
            /** @todo: check id exam exists */
            const getIdExamsResult = await this.handleGetAllExamId();
            if (getIdExamsResult.isFailure())
                return next(getIdExamsResult.error);
            const { data: listIds } = getIdExamsResult;
            const hasAllElems = req.body.examId.every((elem) => listIds.includes(elem));
            if (!hasAllElems)
                return next(new app_error_1.default('Something wrong from list exam ids!', 400));
            /** @todo: save data to table exam_user_entity */
            const _listExamUser = [];
            Object.values(req.body.examId).map((item) => {
                const examUser = new examUser_entity_1.default();
                examUser.exam = item;
                examUser.user = req.body.userId;
                _listExamUser.push(examUser);
            });
            const newExamUser = await this.handleCreateExamUser(_listExamUser);
            if (newExamUser.isFailure())
                return next(newExamUser.error);
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: 'Access exam to user to database success',
                data: {
                    item: newExamUser.data
                }
            });
        });
        /** @todo: validation field */
        this.handleValidation = (request) => {
            /** get information */
            const body = request.body;
            const validations = [];
            const fields = ['examId', 'userId'];
            /** @todo: Validate field requires **/
            for (const field of fields) {
                validations.push(new requiredFields_1.RequiredFieldValidation(field));
            }
            /** @todo: init validationComposite **/
            const validationComposite = new validations_1.ValidationComposite(validations);
            return validationComposite.validate(body);
        };
        /** @todo: check id user exists */
        this.handleCheckIdUser = async (id) => {
            const user = await this._userService.getUserById(id);
            if (!user)
                return (0, functions_1.failure)(new app_error_1.default('User is not exists in database!', 400));
            return (0, functions_1.success)(user);
        };
        /** @todo: check id exam exists */
        this.handleGetAllExamId = async () => {
            const exams = await this._examsServices.getAll();
            const examsId = [];
            Object.values(exams).map((item) => {
                examsId.push(item.id);
            });
            return (0, functions_1.success)(examsId);
        };
        /** @todo: save exams relation with user to database */
        this.handleCreateExamUser = async (item) => {
            const newItem = await this._examUserService.create(item);
            return (0, functions_1.success)(newItem);
        };
    }
}
exports.CreateExamRelationUserController = CreateExamRelationUserController;
