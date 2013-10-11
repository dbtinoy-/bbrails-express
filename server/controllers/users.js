var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , _ = require('lodash');

function allUsers(cb) {
  User.find(function(err, users) {
    if (err) { return cb(err); }
    if (!users) { return cb(new Error('user not found')); }
    var res = _.map(users, function(user) { return user.toObject(); } );
    return cb(null, res);

  });
}

module.exports = {
  all: function(req, res, next) {
    allUsers(function(err, users) {
      res.send(users);
    });
  }
};

