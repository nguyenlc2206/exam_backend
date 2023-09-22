"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const env_config_1 = require("./config/env.config");
const typeorm_config_1 = require("~/infrastructure/config/typeorm.config");
const express_config_1 = __importDefault(require("./config/express.config"));
/** Define main function */
const main = async () => {
    await typeorm_config_1.AppDataSource.initialize()
        .then(async () => {
        console.log('Connected to database');
        const app = (0, express_1.default)();
        app.use((0, compression_1.default)());
        const Express = new express_config_1.default(app, Number(env_config_1.ENV.port) || 3000);
        await Express.init();
    })
        .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
};
// run main function
main();
