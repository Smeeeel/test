'use strict';

const express = require('express'),
    validate = require('express-validation'),
    validation = require('./validation/auth'),
    authCtrl = require('../controllers/auth.controller'),
    checkUsernameMiddleware = require('../../utils/checkUsernameMiddleware');

const router = express.Router();
/**
 * POST /api/auth/sign-in
 * login to account
 * */
router.route('/sign-in').post(validate(validation.login), authCtrl.signIn);
/**
 * POST /api/auth/sign-up
 * account registration
 * */
router.route('/sign-up').post(validate(validation.login), checkUsernameMiddleware, authCtrl.signUp);

module.exports = router;