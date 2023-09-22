"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../routes/auth.routes");
const roles_routes_1 = require("../routes/roles.routes");
const groups_routes_1 = require("../routes/groups.routes");
const category_routes_1 = require("../routes/category.routes");
const exams_routes_1 = require("../routes/exams.routes");
const exam_user_routes_1 = require("../routes/exam.user.routes");
const users_routes_1 = require("../routes/users.routes");
const questions_routes_1 = require("../routes/questions.routes");
const answers_routes_1 = require("../routes/answers.routes");
/** Setup routes express */
const setupRoutes = (app) => {
    const routesSetup = [
        auth_routes_1.authRoutesSetup,
        roles_routes_1.rolesRoutesSetup,
        groups_routes_1.groupsRoutesSetup,
        category_routes_1.categoriesRoutesSetup,
        exams_routes_1.examsRoutesSetup,
        exam_user_routes_1.examUserRoutesSetup,
        users_routes_1.usersRoutesSetup,
        questions_routes_1.questionsRoutesSetup,
        answers_routes_1.answersRoutesSetup
    ];
    const router = (0, express_1.Router)();
    app.use('/api/v1', router);
    routesSetup.forEach((route) => route(router));
};
exports.setupRoutes = setupRoutes;
