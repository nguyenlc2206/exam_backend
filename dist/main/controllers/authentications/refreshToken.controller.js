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
exports.RefreshTokenController = void 0;
const uuid_1 = require("uuid");
const catch_async_1 = __importDefault(require("../../../shared/catch-async"));
const functions_1 = require("../../../shared/functions");
const jwtAdapter_1 = require("../../../shared/jwt/jwtAdapter");
const env_config_1 = require("../../config/env.config");
/** Define refresh token controller */
class RefreshTokenController {
    constructor() {
        /** execute function */
        this.execute = (0, catch_async_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            /** @todo: generate token by email and id */
            const generateTokenResult = yield this.handleGenerateToken(req.userInfor);
            if (generateTokenResult.isFailure())
                return next(generateTokenResult.error);
            const { data: _token } = generateTokenResult;
            /** @todo: generate refresh token by email and id */
            const generateRefreshTokenResult = yield this.handleGenerateRefreshToken(req.userInfor);
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
        }));
        /** @todo: generate token by email and id */
        this.handleGenerateToken = (user) => __awaiter(this, void 0, void 0, function* () {
            const { jwtSecret, expiresIn } = env_config_1.ENV;
            const tokenGeneratorAdapter = new jwtAdapter_1.TokenGeneratorAdapter(jwtSecret, expiresIn);
            const _key = { email: user.email, id: user.id, uuid: (0, uuid_1.v4)() };
            const token = yield tokenGeneratorAdapter.generate(_key);
            return (0, functions_1.success)(token);
        });
        /** @todo: generate refresh token by email and id */
        this.handleGenerateRefreshToken = (user) => __awaiter(this, void 0, void 0, function* () {
            const { jwtSecret } = env_config_1.ENV;
            const tokenGeneratorAdapter = new jwtAdapter_1.TokenGeneratorAdapter(jwtSecret, '30d');
            const _key = { email: user.email, id: user.id, uuid: (0, uuid_1.v4)() };
            const refreshToken = yield tokenGeneratorAdapter.generate(_key);
            return (0, functions_1.success)(refreshToken);
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
