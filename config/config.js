import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envVarsSchema = joi
  .object({
    JWT_SECRET_KEY: joi.string().required(),
    REFRESH_SECRET_KEY: joi.string().required(),
    JWT_SECRET_EXPIRES_IN: joi.string().default("30min"),
    REFRESH_TOKEN_EXPIRY: joi.string().default("7days"),
    REDIS_URL: joi.string().required(),
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

  redis: {
    url: envVars.REDIS_URL,
  },
};

export default config;
