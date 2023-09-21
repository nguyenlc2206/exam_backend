import { Express, Router } from "express";
import { authRoutesSetup } from "../routes/auth.routes";
import { rolesRoutesSetup } from "../routes/roles.routes";
import { groupsRoutesSetup } from "../routes/groups.routes";
import { categoriesRoutesSetup } from "../routes/category.routes";
import { examsRoutesSetup } from "../routes/exams.routes";
import { examUserRoutesSetup } from "../routes/exam.user.routes";
import { usersRoutesSetup } from "../routes/users.routes";
import { questionsRoutesSetup } from "../routes/questions.routes";
import { answersRoutesSetup } from "../routes/answers.routes";

/** Setup routes express */
export const setupRoutes = (app: Express): void => {
    const routesSetup = [
        authRoutesSetup,
        rolesRoutesSetup,
        groupsRoutesSetup,
        categoriesRoutesSetup,
        examsRoutesSetup,
        examUserRoutesSetup,
        usersRoutesSetup,
        questionsRoutesSetup,
        answersRoutesSetup,
    ];

    const router = Router();
    app.use("/api/v1", router);

    routesSetup.forEach((route) => route(router));
};
