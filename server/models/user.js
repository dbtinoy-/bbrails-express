/* jshint node:true */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pass = require('pwd');

var UserSchema = new Schema({
  username: {
    type: String
  , required: true
  , index:  {unique: true}
  }
, password: {
    type: String
  , required: true
  }

, salt: String

, last_name: String

, first_name: String

, email: {
    type: String
  , required: true
  }

, board_ids: [{type: Schema.Types.ObjectId, ref: 'Board'}]
, organization_ids: [{type: Schema.Types.ObjectId, ref: 'Organisation'}]
});

UserSchema.statics.findOneByUsername = function(name, cb) {
  this.findOne({username: name}, cb);
};

UserSchema.statics.findOneById = function(id, cb) {
  if (!id) { return cb(null, false); }
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return cb(null, false);
  }
  this.findOne({_id: id || ''}, cb);
};

UserSchema.pre('save', function(next) {
  var user = this;

  if(!user.isModified('password')) { return next(); }

  pass.hash(user.password, function(err, salt, hash) {
    if (err) { return next(err); }
    user.password = hash;
    user.salt = salt;
    next();
  });

});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  var password = this.password;
  pass.hash(candidatePassword, this.salt, function(err, hash) {
    if (err) { return cb(err); }
    cb(null, password == hash);
  });
};

if (!UserSchema.options.toObject) { UserSchema.options.toObject = {}; }
UserSchema.options.toObject.hide = 'password salt';
UserSchema.options.toObject.transform = function (doc, ret, options) {
  if (options.hide) {
    options.hide.split(' ').forEach(function (prop) {
      delete ret[prop];
    });
  }
};

var User = mongoose.model('User', UserSchema);

module.exports = User;