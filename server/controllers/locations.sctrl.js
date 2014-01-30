 var mongoose = require('mongoose')
  , Location  = mongoose.model('Location')
  , _         = require('lodash')
  , async     = require('async')

  , check     = require('validator').check
  , sanitize  = require('validator').sanitize
  , Validator = require('validator').Validator;

Validator.prototype.error = function (msg) {
    this._errors.push(msg);
    return this;
};

Validator.prototype.getErrors = function () {
    return this._errors;
};


function all(cb) {
  async.waterfall([
    //   function(callback) {
    //     setTimeout(callback, 1000);
    //   }
    // ,
      function(callback) {
        Location.find(callback);
      }
    ], function(err, locations) {
      if (err) return cb(err);
      setTimeout(function() {
        return cb(null, locations);
      }, 500);
    });
}


function findById(id, cb) {
  Location.findOne({'_id': id}, function(err, location) {
    if (err) { return cb(err); }

    if (!location) { return cb(new Error(['location id ', id, ' not found'].join(''))); }

    return cb(null, location);
  });
}

function destroy(id, cb) {
  async.waterfall([
    function(callback) {
      findById(id, callback);
    }

  , function(db_member, callback) {
      db_member.remove(callback);
    }
  ], cb);

}

module.exports = {
  all: function(req, res, next) {
    all(function(err, locations) {
      if (err) return next(err);
      res.send(locations);
    });
  }

, destroy: function(req, res, next) {
    destroy(req.params.id, function(errs) {
      if (errs) {
        console.log(errs);
        return next(errs);
      }
      res.send({});
    });
  }
};