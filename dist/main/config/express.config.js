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
const express_cors_1 = require("./express.cors");
const express_rate_limit_1 = require("express-rate-limit");
const express_routes_1 = require("./express.routes");
const app_error_1 = __importDefault(require("../../error-handling/app.error"));
const global_error_1 = require("../../error-handling/global.error");
class ExpressConfig {
    constructor(express, port) {
        this.app = express;
        this.port = port;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /** json pareser */
                this.app.use(express_1.default.json());
                /** cors config */
                (0, express_cors_1.expressCors)(this.app);
                /** limiter request config */
                // Limit requests from same API
                const limiter = (0, express_rate_limit_1.rateLimit)({
                    max: 100,
                    windowMs: 60 * 60 * 1000,
                    message: 'Too many requests from this IP, please try again in an hour!'
                });
                this.app.use('/api', limiter);
                /** routes config */
                (0, express_routes_1.setupRoutes)(this.app);
                /** check url not support in this server */
                this.app.all('*', (req, _, next) => {
                    next(new app_error_1.default(`Unsupport path ${req.originalUrl} on this server!`, 404));
                });
                /** global config respose error */
                this.app.use(global_error_1.globalErrorConfig);
                /** listen port */
                this.app.listen(this.port, () => {
                    console.log(`Server is running on port ${this.port}`);
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = ExpressConfig;
