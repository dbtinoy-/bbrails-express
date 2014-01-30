 var mongoose = require('mongoose')
  , Crew      = mongoose.model('Crew')
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
        Crew.find(callback);
      }
    ], function(err, crews) {
      if (err) return cb(err);
      return cb(null, crews);
    });
}

function findById(id, cb) {
  Crew.findOne({'_id': id}, function(err, member) {
    if (err) { return cb(err); }

    if (!member) { return cb(new Error(['crew id ', id, ' not found'].join(''))); }

    return cb(null, member);
  });
}

function create(data, cb) {
  var member = new Crew(data);
  return cb(null, member);
}

function save(id, data, cb) {

  async.waterfall([
    function(callback) {
      validateCrewSave(id, data, callback);
    }

  , function(cleaned_data, callback) {
      data = cleaned_data;

      if (id) findById(id, callback);
      else create(data, callback);
    }

  , function(db_member, callback) {
      _.extend(db_member, data);
      db_member.save(callback);
    }
  ], function(err, member) {
    cb(err, member);
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


function validateCrewSave(id, data, cb) {
  var nb = 0
    , errors = {}
    , fields = ['name'];

  if (id) fields = fields.concat(['title', 'origin', 'age', 'avatar', 'species']);

  _.each(fields, function(fd) {
    var err = check(data[fd]).notNull().getErrors();
    if (err.length) {
      nb++;
      errors[fd] = err;
    }
  });

  if (nb) { return cb(errors); }

  return cb(null, data);
}


module.exports = {
  all: function(req, res, next) {
    all(function(err, crew) {
      if (err) return next(err);
      res.send(crew);
    });
  }

, show: function(req, res, next) {
    findById(req.params.id, function(err, member) {
      if (err) return next(err);
      res.send(member.toJSON());
    });
  }

, update: function(req, res, next) {
    save(req.params.id, req.body, function(errs, member) {
      if (errs) return res.send('422', {errors: errs});
      res.send(member.toJSON());
    });
  }

, create: function(req, res, next) {
    save(null, req.body, function(errs, member) {
      if (errs) return res.send('422', {errors: errs});
      res.send(member.toJSON());
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
