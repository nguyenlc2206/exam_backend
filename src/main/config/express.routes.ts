import { Express, Router } from 'express';
import { authRoutesSetup } from '@src/main/routes/auth.routes';
import { rolesRoutesSetup } from '@src/main/routes/roles.routes';
import { groupsRoutesSetup } from '@src/main/routes/groups.routes';
import { categoriesRoutesSetup } from '@src/main/routes/category.routes';
import { examsRoutesSetup } from '@src/main/routes/exams.routes';
import { examUserRoutesSetup } from '@src/main/routes/exam.user.routes';
import { usersRoutesSetup } from '@src/main/routes/users.routes';
import { questionsRoutesSetup } from '@src/main/routes/questions.routes';
import { answersRoutesSetup } from '@src/main/routes/answers.routes';

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
        answersRoutesSetup
    ];

    const router = Router();
    app.use('/api/v1', router);

    routesSetup.forEach((route) => route(router));
};
