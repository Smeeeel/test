'use strict';

const express = require('express'),
    validate = require('express-validation'),
    validation = require('./validation/event'),
    eventCtrl = require('../controllers/event.controller');

const router = express.Router();
/**
 * POST /api/events
 * create event
 * */
router.route('/').post(validate(validation.createEvent), eventCtrl.createEvent);
/**
 * GET /api/events
 * get all events for user
 * */
router.route('/').get(eventCtrl.getAllEventsForUser);
/**
 * DELETE /api/events/:eventId
 * remove event
 * */
router.route('/:eventId').delete(validate(validation.removeEvent), eventCtrl.removeEvent);
/**
 * PUT /api/events/:eventId
 * update event
 * */
router.route('/:eventId').put(validate(validation.updateEvent), eventCtrl.updateEvent);

module.exports = router;

