/* jshint node:true */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: String
, description: String
, danger: String
});



var Location = mongoose.model('Location', LocationSchema);

module.exports = Location;