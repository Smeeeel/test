'use strict';

const Joi = require('joi'),
    MONGO_OBJECT_ID_REGEX = /^[0-9a-fA-F]{24}$/;

const validator = {
    //POST /api/events/
    createEvent: {
        body: Joi.object().keys({
            eventName: Joi.string().required(),
            eventTime: Joi.date().required()
        }).unknown(false)
    },
    //POST /api/events/:eventId
    removeEvent:{
        params:{
            eventId:Joi.string().regex(MONGO_OBJECT_ID_REGEX).required()
        }
    },
    //POST api/events/:eventId
    updateEvent:{
        body:{
            eventName:Joi.string().min(1),
            eventTime:Joi.date()
        },
        params:{
            eventId:Joi.string().regex(MONGO_OBJECT_ID_REGEX).required()
        }
    }
};

module.exports = validator;