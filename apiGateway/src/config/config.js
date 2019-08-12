var Joi = require("joi");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require("dotenv").config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development"),
  PORT: Joi.number().default(3000),
  MOBILE_APP: Joi.string(),
  ADMIN_APP: Joi.string(),
  MongoDB_URL: Joi.string(),
  SURVEY_MongoDB_URL:Joi.string(),
  JWT_SECRET: Joi.string()
    .default("GREAT!@!#$$%@%$SFA")
    .description("JWT Secret required to sign"),
  JWT_TOKEN_EXPIRE: Joi.string()
    .default("1d")
    .description("JWT Token Expired in Days")
})
  .unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  mobileApp: envVars.MOBILE_APP,
  adminApp: envVars.ADMIN_APP,
  mongoURL: envVars.MongoDB_URL,
  surveymongoURL:envVars.SURVEY_MongoDB_URL,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwtSecret: envVars.JWT_SECRET,
  jwtTokenExpire: envVars.JWT_TOKEN_EXPIRE
};

module.exports = config;
