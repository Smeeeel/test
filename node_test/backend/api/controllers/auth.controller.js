'use strict';

const User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/config');

/**
 * function sign in
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function signIn(req, res, next) {
    try {
        let user = await User.signIn({
            login: req.body.login,
            password: req.body.password
        });
        return res.json({
            user,
            token: createAccessToken(user)
        });
    } catch (err) {
        return next(err);
    }

}

/**
 * function sign up
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
async function signUp(req, res, next) {
    try {
        let user = await User.signUp({
            login: req.body.login,
            password: req.body.password
        });
        return res.json({
            user,
            token: createAccessToken(user)
        });
    } catch (err) {
        return next(err);
    }
}


/**
 * create access token
 * @param user
 * @returns {*}
 */
function createAccessToken(user) {
    return jwt.sign({data: {login: user.login, id: user._id}}, config.jwtSecret);
}


module.exports = {
    signIn,
    signUp
};