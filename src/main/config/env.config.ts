import * as dotenv from 'dotenv';

dotenv.config();

const { env } = process;

export const ENV = {
    port: env.PORT || 8000,
    bcryptSalt: Number(env.BCRYPT_SALT) || 12,
    jwtSecret: env.JWT_SECRET || 'any_secret_1tJK==__02&sdA',
    expiresIn: env.JWT_EXPIRES_IN || '1h',
    passwordDB: env.PASSWORD_DB,
    portDB: env.PORT_DB || 5432,
    usernameDB: env.USERNAME_DB,
    hostDb: env.HOST_DB,
    databaseName: env.DATABASE_NAME,
    databaseURL: env.DATABASE_URL
};
