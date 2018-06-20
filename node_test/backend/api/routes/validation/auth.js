'use strict';

const Joi = require('joi'),
    MONGO_OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const validator = {
    //POST api/auth/sign-in[sign-up]
    login: {
        body:Joi.object().keys({
            login: Joi.string().email().min(3).max(30).required(),
            password: Joi.string().min(6).required()
        }).unknown(false)
    }
};

module.exports = validator;