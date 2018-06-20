'use strict';

const UserModel = require('../api/models/user'),
	  APIError = require('./api-error'),
	  filteredString = require('./filteredString'),
      logger = require('../config/logger').instance;
/**
 * middleware which checks the user's username on uniqueness;
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
module.exports = function(req, res, next) {
	if(req.body.login){
		let query = filteredString(req.body.login);
		return UserModel.findOne({login:{$regex:new RegExp(`\^${query}\$`, 'i')}})
		.then(hasUser =>{
			if(hasUser){
				logger.warn('User with this login exists', req.body.username);
				let err = new APIError('User with this login exists.', 406, true);
				return next(err);
			}

			return next();
		}).catch(next);
	}

	return next();
}