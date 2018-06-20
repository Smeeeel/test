'use strict';
    const EventModel = require('../models/event');

async function createEvent(req, res, next){
    try{
        let event = await EventModel.createEvent({
            eventName:req.body.eventName,
            eventTime:req.body.eventTime,
            creator:req.selectedUser._id
        });
        return res.json(event);
    }catch(err){
        return next(err)
    }
}

async function getAllEventsForUser(req, res, next){
    try{
        let events = await EventModel.getAllEventsForUser({
            selectedUser:req.selectedUser
        });
        return res.json(events);
    }catch(err){
        return next(err);
    }
}

async function removeEvent(req, res, next){
    try{
        let isRemove = await EventModel.removeEvent({
            selectedUser:req.selectedUser,
            eventId:req.params.eventId
        });
        return res.json({success:true});
    }catch(err){
        return next(err);
    }
}

async function updateEvent(req, res, next) {
    try {
        let isUpdate = await EventModel.updateEvent({
            selectedUser: req.selectedUser,
            eventId: req.params.eventId,
            data: req.body
        });

        return res.json(isUpdate);
    }catch(err){
        return next(err);
    }
}


module.exports = {
    createEvent,
    getAllEventsForUser,
    removeEvent,
    updateEvent
}