"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config();
const envVarsSchema = joi_1.default
    .object({
    JWT_SECRET_KEY: joi_1.default.string().required(),
    REFRESH_SECRET_KEY: joi_1.default.string().required(),
    JWT_SECRET_EXPIRES_IN: joi_1.default.string().default("30min"),
    REFRESH_TOKEN_EXPIRY: joi_1.default.string().default("7days"),
    REDIS_URL: joi_1.default.string().required(),
    DATABASE_URL: joi_1.default.string().required(),
})
    .unknown()
    .required();
const { value: envVars, error } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const config = {
    jwt: {
        secret: envVars.JWT_SECRET_KEY,
        expiresIn: envVars.JWT_SECRET_EXPIRES_IN,
    },
    refreshToken: {
        secret: envVars.REFRESH_SECRET_KEY,
        expiresIn: envVars.REFRESH_TOKEN_EXPIRY,
    },
    db: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT) || 5432,
        url: process.env.DATABASE_URL,
        sync: false,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
    redis: {
        url: envVars.REDIS_URL,
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map