'use strict';

const logger = require('../config/logger').instance,
    bcrypt = require('bcrypt'),
    APIError = require('./api-error'),
    {SALT_ROUNDS} = require('../constants');


function hash(value) {
    return new Promise((resolve, rejected) => {
        bcrypt.hash(`${value}`, SALT_ROUNDS, (err, hash) => {
            if (err) {
                logger.warn(`The hash generation for the number ${value} has failed`, value);
                let err = new APIError('Internal server error', 500, true);
                return rejected(err);
            }

            return resolve(hash);
        });
    });
}

function checkHash(original, hash) {
    return new Promise((resolve, rejected) => {
        bcrypt.compare(`${original}`, hash).then(allow => {
            return resolve(allow);
        }).catch(rejected);
    });
}

module.exports = {
    hash,
    checkHash
};