import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ENV } from '@src/main/config/env.config';

// import { GroupsTableInit1694934066735 } from '../migrations/1694934066735-GroupsTableInit';
// import { GroupRoleTableInit1694934157356 } from '../migrations/1694934157356-GroupRoleTableInit';
// import { RolesTableInit1694934273856 } from '../migrations/1694934273856-RolesTableInit';
// import { ExamCategoryTableInit1695178172833 } from '../migrations/1695178172833-ExamCategoryTableInit';
// import { ExamTableInit1695181192602 } from '../migrations/1695181192602-ExamTableInit';
// import { QuestionTableInit1695181612280 } from '../migrations/1695181612280-QuestionTableInit';
// import { AnswerTableInit1695182365708 } from '../migrations/1695182365708-AnswerTableInit';
// import { ExamUserTableInit1695217649175 } from '../migrations/1695217649175-ExamUserTableInit';
// import { UsersTableInit1694931638143 } from '../migrations/1695130922313-UsersTableInit';

import UsersEntity from '@src/domain/entities/user.entity';
import AnswersEntity from '@src/domain/entities/answer.entity';
import ExamsCategoryEntity from '@src/domain/entities/exam.category.entity';
import ExamsEntity from '@src/domain/entities/exam.entity';
import ExamUserEntity from '@src/domain/entities/examUser.entity';
import GroupsEntity from '@src/domain/entities/group.entity';
import GroupsRolesEntity from '@src/domain/entities/groupRole.entity';
import QuestionsEntity from '@src/domain/entities/question.entity';
import RolesEntity from '@src/domain/entities/role.entity';
import { MigrationInit1696254834540 } from '@src/infrastructure/migrations/1696254834540-MigrationInit';

config();

/** config database type */
const DB_TYPE: 'mysql' | 'mariadb' | 'postgres' | 'mssql' | 'oracle' | 'sqlite' = 'postgres';

export const DB_CONFIG = {
    type: DB_TYPE,
    host: ENV.hostDb,
    port: Number(ENV.portDB),
    username: ENV.usernameDB,
    password: ENV.passwordDB,
    database: ENV.databaseName,
    URL: ENV.databaseURL
};

/** Define config app datasource typeorm */
const AppDataSource = new DataSource({
    type: DB_CONFIG.type,
    host: 'db',
    port: DB_CONFIG.port,
    username: 'postgres',
    password: 'postgres',
    database: 'exams_database',
    // url: DB_CONFIG.URL,
    synchronize: true,
    logging: false,
    // extra: {
    //     ssl: {
    //         rejectUnauthorized: false
    //     }
    // },
    // entities: ['src/infrastructure/migrations/**/*.ts']
    entities: [
        UsersEntity,
        AnswersEntity,
        ExamsCategoryEntity,
        ExamsEntity,
        ExamUserEntity,
        GroupsEntity,
        GroupsRolesEntity,
        QuestionsEntity,
        RolesEntity
    ],
    // migrations: ['src/infrastructure/migrations/**/*.ts']
    migrations: [
        MigrationInit1696254834540
        // GroupsTableInit1694934066735,
        // RolesTableInit1694934273856,
        // GroupRoleTableInit1694934157356,
        // UsersTableInit1694931638143,
        // ExamCategoryTableInit1695178172833,
        // AnswerTableInit1695182365708,
        // ExamTableInit1695181192602,
        // QuestionTableInit1695181612280,
        // ExamUserTableInit1695217649175
    ]
    // subscribers: ["src/infrastructure/subscribers/**/*.ts"],
});

export default AppDataSource;
