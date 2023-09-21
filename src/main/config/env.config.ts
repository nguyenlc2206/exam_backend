import * as dotenv from "dotenv";

dotenv.config();

const { env } = process;

export const ENV = {
    port: env.PORT || 8000,
    bcryptSalt: Number(env.BCRYPT_SALT) || 12,
    jwtSecret: env.JWT_SECRET || "any_secret_1tJK==__02&sdA",
    expiresIn: env.JWT_EXPIRES_IN || "1h",
};
