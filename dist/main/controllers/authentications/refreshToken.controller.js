"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenController = void 0;
const uuid_1 = require("uuid");
const env_config_1 = require("~/main/config/env.config");
const catch_async_1 = __importDefault(require("~/shared/catch-async"));
const functions_1 = require("~/shared/functions");
const jwtAdapter_1 = require("~/shared/jwt/jwtAdapter");
/** Define refresh token controller */
class RefreshTokenController {
    constructor() {
        /** execute function */
        this.execute = (0, catch_async_1.default)(async (req, res, next) => {
            /** @todo: generate token by email and id */
            const generateTokenResult = await this.handleGenerateToken(req.userInfor);
            if (generateTokenResult.isFailure())
                return next(generateTokenResult.error);
            const { data: _token } = generateTokenResult;
            /** @todo: generate refresh token by email and id */
            const generateRefreshTokenResult = await this.handleGenerateRefreshToken(req.userInfor);
            if (generateRefreshTokenResult.isFailure())
                return next(generateRefreshTokenResult.error);
            const { data: refreshToken } = generateRefreshTokenResult;
            /** @todo: processing reponse */
            res.status(200).json({
                status: 'success',
                message: `Login with email ${req.body.email} success`,
                data: {
                    accessToken: _token,
                    refreshToken: refreshToken
                }
            });
        });
        /** @todo: generate token by email and id */
        this.handleGenerateToken = async (user) => {
            const { jwtSecret, expiresIn } = env_config_1.ENV;
            const tokenGeneratorAdapter = new jwtAdapter_1.TokenGeneratorAdapter(jwtSecret, expiresIn);
            const _key = { email: user.email, id: user.id, uuid: (0, uuid_1.v4)() };
            const token = await tokenGeneratorAdapter.generate(_key);
            return (0, functions_1.success)(token);
        };
        /** @todo: generate refresh token by email and id */
        this.handleGenerateRefreshToken = async (user) => {
            const { jwtSecret } = env_config_1.ENV;
            const tokenGeneratorAdapter = new jwtAdapter_1.TokenGeneratorAdapter(jwtSecret, '30d');
            const _key = { email: user.email, id: user.id, uuid: (0, uuid_1.v4)() };
            const refreshToken = await tokenGeneratorAdapter.generate(_key);
            return (0, functions_1.success)(refreshToken);
        };
    }
}
exports.RefreshTokenController = RefreshTokenController;
