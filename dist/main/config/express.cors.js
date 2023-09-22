"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressCors = void 0;
const cors_1 = __importDefault(require("cors"));
/** Function cors middleware */
const expressCors = (app) => {
    app.use((0, cors_1.default)({ origin: '*' }));
    app.use((req, res, next) => {
        res.setHeader('access-control-allow-methods', '*');
        res.setHeader('access-control-allow-headers', '*');
        res.setHeader('x-powered-by', '*');
        next();
    });
};
exports.expressCors = expressCors;
