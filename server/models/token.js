/* jshint node:true */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
  token: {
    type: String
  , required: true
  }
, user_id: {
    type: String
  , required: true
  }

, client_id: {
    type: String
  , required: true
  }
});


TokenSchema.statics.createByParams = function createByParams(token, user_id, client_id, cb) {
  this.create({
    token: token
  , user_id: user_id
  , client_id: client_id
  }, cb);
};

TokenSchema.statics.findOneByToken = function(token, cb) {
  this.findOne({token: token}, cb);
};


var Token = mongoose.model('Token', TokenSchema);

module.exports = Token;