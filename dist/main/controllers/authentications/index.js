"use strict";
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
        this.login = async (req, res, next) => {
            const login = new login_controller_1.LoginCotroller(this.service);
            return login.execute(req, res, next);
        };
        /** protect routes */
        this.protect = async (req, res, next) => {
            const protect = new protect_controller_1.ProtectRoutesController(this.service);
            return protect.execute(req, res, next);
        };
        /** change password */
        this.changePassword = async (req, res, next) => {
            const changePassword = new changePassword_controller_1.ChangePasswordController(this.service);
            return changePassword.execute(req, res, next);
        };
        /** get tempoToken */
        this.getTempToken = async (req, res, next) => {
            const getTempoToken = new getTempoToken_controller_1.GetTempoTokenController(this.service);
            return getTempoToken.execute(req, res, next);
        };
        /** forgot password */
        this.forgotPassword = async (req, res, next) => {
            const forgotPassword = new forgotPassword_controller_1.ForgotPasswordController(this.service);
            return forgotPassword.execute(req, res, next);
        };
        /** processing refreshToken */
        this.refreshToken = async (req, res, next) => {
            const refreshToken = new refreshToken_controller_1.RefreshTokenController();
            return refreshToken.execute(req, res, next);
        };
        this.service = service;
    }
}
exports.AuthenticationsController = AuthenticationsController;
