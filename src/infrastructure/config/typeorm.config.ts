import { DataSource } from "typeorm";
import { config } from "dotenv";

// import { GroupRoleTableInit1694934157356 } from "../migrations/1694934157356-GroupRoleTableInit";
// import { RolesTableInit1694934273856 } from "../migrations/1694934273856-RolesTableInit";
// import { GroupsTableInit1694934066735 } from "../migrations/1694934066735-GroupsTableInit";
// import { UsersTableInit1694931638143 } from "../migrations/1695130922313-UsersTableInit";
// import { ExamCategoryTableInit1695178172833 } from "../migrations/1695178172833-ExamCategoryTableInit";
// import { AnswerTableInit1695182365708 } from "../migrations/1695182365708-AnswerTableInit";
// import { ExamTableInit1695181192602 } from "../migrations/1695181192602-ExamTableInit";
// import { QuestionTableInit1695181612280 } from "../migrations/1695181612280-QuestionTableInit";
// import { ExamUserTableInit1695217649175 } from "../migrations/1695217649175-ExamUserTableInit";

import GroupsEntity from "../../domain/entities/group.entity";
import RolesEntity from "../../domain/entities/role.entity";
import GroupsRolesEntity from "../../domain/entities/groupRole.entity";
import UsersEntity from "../../domain/entities/user.entity";
import ExamsCategoryEntity from "../../domain/entities/exam.category.entity";
import AnswersEntity from "../../domain/entities/answer.entity";
import ExamsEntity from "../../domain/entities/exam.entity";
import QuestionsEntity from "../../domain/entities/question.entity";
import ExamUserEntity from "../../domain/entities/examUser.entity";

config();

/** config database type */
const DB_TYPE:
    | "mysql"
    | "mariadb"
    | "postgres"
    | "mssql"
    | "oracle"
    | "sqlite" = "postgres";

export const DB_CONFIG = {
    type: DB_TYPE,
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Password@123",
    database: "exams_database",
};

/** Define config app datasource typeorm */
export const AppDataSource = new DataSource({
    type: DB_CONFIG.type,
    host: DB_CONFIG.host,
    port: DB_CONFIG.port,
    username: DB_CONFIG.username,
    password: DB_CONFIG.password,
    database: DB_CONFIG.database,
    synchronize: true,
    logging: false,
    // entities: ["src/domain/entities/**/*.ts"],
    entities: [
        GroupsEntity,
        RolesEntity,
        GroupsRolesEntity,
        UsersEntity,
        ExamsCategoryEntity,
        AnswersEntity,
        ExamsEntity,
        QuestionsEntity,
        ExamUserEntity,
    ],
    // migrations: ["src/infrastructure/migrations/**/*.ts"],
    migrations: [
        // GroupsTableInit1694934066735,
        // RolesTableInit1694934273856,
        // GroupRoleTableInit1694934157356,
        // UsersTableInit1694931638143,
        // ExamCategoryTableInit1695178172833,
        // AnswerTableInit1695182365708,
        // ExamTableInit1695181192602,
        // QuestionTableInit1695181612280,
        // ExamUserTableInit1695217649175,
    ],
    // subscribers: ["src/infrastructure/subscribers/**/*.ts"],
});
