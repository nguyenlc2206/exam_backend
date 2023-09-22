"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CONFIG = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const env_config_1 = require("../../main/config/env.config");
// import { GroupsTableInit1694934066735 } from '../migrations/1694934066735-GroupsTableInit';
// import { GroupRoleTableInit1694934157356 } from '../migrations/1694934157356-GroupRoleTableInit';
// import { RolesTableInit1694934273856 } from '../migrations/1694934273856-RolesTableInit';
// import { ExamCategoryTableInit1695178172833 } from '../migrations/1695178172833-ExamCategoryTableInit';
// import { ExamTableInit1695181192602 } from '../migrations/1695181192602-ExamTableInit';
// import { QuestionTableInit1695181612280 } from '../migrations/1695181612280-QuestionTableInit';
// import { AnswerTableInit1695182365708 } from '../migrations/1695182365708-AnswerTableInit';
// import { ExamUserTableInit1695217649175 } from '../migrations/1695217649175-ExamUserTableInit';
// import { UsersTableInit1694931638143 } from '../migrations/1695130922313-UsersTableInit';
// import { MigrationInit1695385298921 } from '../migrations/1695385298921-MigrationInit';
(0, dotenv_1.config)();
/** config database type */
const DB_TYPE = 'postgres';
exports.DB_CONFIG = {
    type: DB_TYPE,
    host: env_config_1.ENV.hostDb,
    port: Number(env_config_1.ENV.portDB),
    username: env_config_1.ENV.usernameDB,
    password: env_config_1.ENV.passwordDB,
    database: env_config_1.ENV.databaseName,
    URL: env_config_1.ENV.databaseURL
};
/** Define config app datasource typeorm */
const AppDataSource = new typeorm_1.DataSource({
    type: exports.DB_CONFIG.type,
    // host: DB_CONFIG.host,
    // port: DB_CONFIG.port,
    // username: DB_CONFIG.username,
    // password: DB_CONFIG.password,
    // database: DB_CONFIG.database,
    url: exports.DB_CONFIG.URL,
    synchronize: true,
    logging: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    entities: ['src/domain/entities/**/*.ts'],
    migrations: ['src/infrastructure/migrations/**/*.ts']
    // migrations: [
    // MigrationInit1695385298921
    // GroupsTableInit1694934066735,
    // RolesTableInit1694934273856,
    // GroupRoleTableInit1694934157356,
    // UsersTableInit1694931638143
    // ExamCategoryTableInit1695178172833,
    // AnswerTableInit1695182365708,
    // ExamTableInit1695181192602,
    // QuestionTableInit1695181612280,
    // ExamUserTableInit1695217649175
    // ]
    // subscribers: ["src/infrastructure/subscribers/**/*.ts"],
});
exports.default = AppDataSource;
