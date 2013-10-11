var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , Organization = mongoose.model('Organization')
  , asyncMap = require('slide').asyncMap
  , _ = require('lodash');

function publishMe(user_id, cb) {
  asyncMap(user_id, findUser, findOrgs, function(err, data) {
    var res = {}
      , user;

    if (err) { return cb(err); }
    _.forEach(data, function(item) {
      res[item.type] = item.data;
    });

    user = res.user;
    user.organizations = res.orgs;
    cb(null, user);
  });
}

function findUser(user_id, cb) {
  User.findById(user_id, function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(new Error('user not found')); }
    return cb(null, {type: 'user', data: user.toObject()});
  });
}

function findOrgs(user_id, cb) {
  Organization.find().exec(function(err, orgs) {
    if (err) { return cb(err); }
    return cb(null, {type: 'orgs', data: orgs} );
  });
}

module.exports = {
  me: function(req, res, next) {
    publishMe(req.user._id, function(err, user) {
      if (err) { return next(err); }
      if (!user) { return next(new Error('not found')); }

      res.send(user);
    });
  }
};

