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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const env_config_1 = require("./config/env.config");
const express_config_1 = __importDefault(require("./config/express.config"));
const typeorm_config_1 = __importDefault(require("../infrastructure/config/typeorm.config"));
/** Define main function */
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield typeorm_config_1.default.initialize()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Connected to database');
        const app = (0, express_1.default)();
        app.use((0, compression_1.default)());
        const Express = new express_config_1.default(app, Number(env_config_1.ENV.port) || 3000);
        yield Express.init();
    }))
        .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });
});
// run main function
main();
