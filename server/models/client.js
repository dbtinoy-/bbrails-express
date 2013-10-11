/* jshint node:true */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  client_secret: String
});

ClientSchema.statics.findOneByClientId = function(client_id, cb) {
  this.findOne({_id: client_id}, cb);
};

ClientSchema.methods.clientSecretCompare = function(client_secret) {
  return this.client_secret == client_secret;
};

ClientSchema.virtual('client_id').get(function() {
  return '' + this._id;
});

var Client = mongoose.model('Client', ClientSchema);

module.exports = Client;