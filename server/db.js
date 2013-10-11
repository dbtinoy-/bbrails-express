/* jshint node:true */
'use strict';

var mongoose = require('mongoose')
  , fs = require('fs')
  , path = require('path')
;


//create user
function setupDefaultUser(db, config) {
  db.once('open', function() {
    var User = mongoose.model('User');

    User.findOneByUsername(config.user.login, function(err, user) {
      if (!user) {
        user = new User({username: config.user.login, password: config.user.pwd, email: 'amelon@b-flower.com'});

        user.save(function(err) {
          if (err) { return console.error('err', err); }
        });
      }
    });

  });
}

function loadModels() {
  var path_models = path.join(__dirname, 'models');
  fs.readdirSync(path_models).forEach(function(file) {
    if (~file.indexOf('.js')) { require(path.join(path_models, file)); }
  });
}


function setup(config) {
  var db;

  mongoose.connect(config.db);
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'mongoose connection error:'));
  db.once('open', console.log.bind(console, 'mongoose connection done'));

  loadModels();
  setupDefaultUser(db, config);
  return mongoose;
}

module.exports = setup;