var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CrewSchema = new Schema({
  age: Number
, name: {type: String, required: true}
, avatar: String
, title: String
, species: String
, origin: String
, quote: String
});


var Crew = mongoose.model('Crew', CrewSchema);

module.exports = Crew;