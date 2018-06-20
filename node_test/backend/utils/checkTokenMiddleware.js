'use strict';
const APIError = require('../utils/api-error'),
    logger = require('../config/logger').instance,
    UserModel = require('../api/models/user'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

function checkTokenUser(req, res, next) {
    if (!req.user || !req.user.data) {
        logger.warn(`A user with token not found`);
        return next(new APIError(`A user with token not found`, 401, true));
    }
    UserModel.findOne({_id: ObjectId(req.user.data.id)})
        .then(user => {
            if (!user) {
                logger.warn(`A user with this id ${req.user.data.id} not found`, req.user.data.id);
                let err = new APIError(`A user with token not found`, 401, true);
                return next(err);
            }

            req.selectedUser = user;
            return next();
        }).catch(next);
}

module.exports = checkTokenUser;