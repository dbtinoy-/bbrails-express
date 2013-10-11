/* jshint node:true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var friendly = require('mongoose-friendly');

var OrgaSchema = new Schema({
  name: {
    type: String
  , required: true
  }
, description: String
});

OrgaSchema.plugin(friendly, {
  source: 'name'
, findById: false
});

var Orga = mongoose.model('Organization', OrgaSchema);

module.exports = Orga;
