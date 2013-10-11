/* jshint node:true */
var mongoose = require('mongoose')
  , Organization = mongoose.model('Organization');

function post(req, res, next) {
  var params = req.body
    , orga = new Organization(params);

  orga.save(function(err, orga) {
    if (err) { return next(err); }
    res.send(orga);
  });

}

module.exports = {
  post: post
};

