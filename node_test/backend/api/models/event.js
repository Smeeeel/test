'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    APIError = require('../../utils/api-error'),
    ObjectId = mongoose.Types.ObjectId,
    logger = require('../../config/logger').instance;

const eventSchema = new Schema({
    eventName: {
        type: String,
        required: true
    },
    eventTime: {
        type: Date,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
}, {timestamps: true, collection: 'Events'});

eventSchema.statics = {
    /**
     * create Event
     * @param options
     * @returns {Promise<void>}
     */
    createEvent: async (options) => {
        try {
            return await EventModel.create(options)
        } catch (err) {
            throw err;
        }
    },
    getAllEventsForUser: async (options) => {
        let {selectedUser} = options;
        try {
            return await EventModel.find({
                creator: selectedUser._id
            }, 'eventName eventTime');
        } catch (err) {
            throw err;
        }
    },
    removeEvent: async (options) => {
        let {selectedUser, eventId} = options;
        try {
            return await EventModel.remove({
                _id:new ObjectId(eventId),
                creator:selectedUser._id
            });
        } catch (err) {
            throw err;
        }
    },
    updateEvent: async (options) =>{
        let {selectedUser, eventId, data} = options;

        try{
            let isUpdate = await EventModel.updateOne({
                _id:new ObjectId(eventId),
                creator:selectedUser._id
            }, {$set:data});
            if(!isUpdate.nModified){
                let err = new APIError('Event not found', 406, true);
                logger.warn(`User with id ${selectedUser._id} tries update evnet ${eventId}, but not found`);
                throw err;
            }
            return {success:true};
        }catch(err){
            throw err;
        }
    }
}

const EventModel = mongoose.model('Events', eventSchema);

module.exports = EventModel;