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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationsController = void 0;
const changePassword_controller_1 = require("./changePassword.controller");
const forgotPassword_controller_1 = require("./forgotPassword.controller");
const getTempoToken_controller_1 = require("./getTempoToken.controller");
const login_controller_1 = require("./login.controller");
const protect_controller_1 = require("./protect.controller");
const refreshToken_controller_1 = require("./refreshToken.controller");
/** Define auth controller */
class AuthenticationsController {
    constructor(service) {
        /** create user */
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const login = new login_controller_1.LoginCotroller(this.service);
            return login.execute(req, res, next);
        });
        /** protect routes */
        this.protect = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const protect = new protect_controller_1.ProtectRoutesController(this.service);
            return protect.execute(req, res, next);
        });
        /** change password */
        this.changePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const changePassword = new changePassword_controller_1.ChangePasswordController(this.service);
            return changePassword.execute(req, res, next);
        });
        /** get tempoToken */
        this.getTempToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const getTempoToken = new getTempoToken_controller_1.GetTempoTokenController(this.service);
            return getTempoToken.execute(req, res, next);
        });
        /** forgot password */
        this.forgotPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const forgotPassword = new forgotPassword_controller_1.ForgotPasswordController(this.service);
            return forgotPassword.execute(req, res, next);
        });
        /** processing refreshToken */
        this.refreshToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const refreshToken = new refreshToken_controller_1.RefreshTokenController();
            return refreshToken.execute(req, res, next);
        });
        this.service = service;
    }
}
exports.AuthenticationsController = AuthenticationsController;
