'use strict';

const express = require('express'),
    config = require('../../config/config'),
    router = express.Router(),
    expressJwt = require('express-jwt'),
    authRoutes = require('./auth.route'),
    eventRoutes = require('./event.route');

const authMiddleware = expressJwt({secret: config.jwtSecret});
const checkTokenMiddleware = require('../../utils/checkTokenMiddleware');

// test route
router.get('/health', (req, res, next) => {
    res.json({test: 'success'});
});

router.use('/auth', authRoutes);

router.use('/events', authMiddleware, checkTokenMiddleware, eventRoutes);

module.exports = router;