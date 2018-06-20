'use strict';

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      APIError = require('../../utils/api-error'),
      logger = require('../../config/logger').instance,
      passwordHelper = require('../../utils/passwordHelper');

const userSchema = new Schema({
    login:{
        type:String,
        unique:true,
        required:true,
        index:true
    },
    hashPassword:{
        type:String,
        required:true
    }
}, {collection: 'Users', timestamps: true});

userSchema.statics = {
    signUp:async (options) =>{
        let {login, password} = options;
        try{
            let hashPassword = await passwordHelper.hash(password);
            let user = await UserModel.create({
                login,
                hashPassword
            });
            user.hashPassword = undefined;
            user.__v = undefined;
            return user;
        }catch (err) {
            throw err;
        }
    },
    signIn:async (options) =>{
        let {login, password} = options;
        try{
            let user = await UserModel.findOne({
                login
            }, '-hashPassword -__v');
            if(!user){
                let err = new APIError('Incorrect login or password', 403, true);
                logger.info(`User with name ${login} not found`);
                throw err;
            }
            let isCorrectPassword = await passwordHelper.hash(password, user.hashPassword);
            if(!isCorrectPassword){
                let err = new APIError('Incorrect login or password', 403, true);
                logger.info(`User with id ${user._id} tries sign in with an incorrect password`);
                throw err;
            }

            return user;
        }catch (err) {
            throw err;
        }
    }
};

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;