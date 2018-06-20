'use strict';

const Joi = require('joi'),
      path = require('path');

require('dotenv').config({path:path.join(__dirname, '../', 'process.env')});

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string()
        .allow(['development', 'test', 'production'])
        .default('development'),
    PORT: Joi.number().default(3030),
    MONGOOSE_DEBUG: Joi.boolean().default(false),
    MONGO_LINK: Joi.string().required().description('Mongo DB connection url'),
    JWT_SECRET: Joi.string().required().description('JWT Secret required to sign'),
    JWT_EXP: Joi.string().default('30d').description('JWT token life time'),
    CORS: Joi.boolean().default(false).description('Enable CORS middleware'),
}).unknown().required();

const {error, value: envVars} = Joi.validate(process.env, envVarsSchema);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseDebug: envVars.MONGOOSE_DEBUG,
    mongoURL: envVars.MONGO_LINK,
    jwtSecret: envVars.JWT_SECRET,
    jwtExp: envVars.JWT_EXP,
    cors: envVars.CORS,
};

// JWT Exp format info at : https://github.com/zeit/ms

module.exports = config;