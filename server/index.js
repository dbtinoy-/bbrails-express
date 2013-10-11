/*jshint node:true*/
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express')
  , app = express()
  , oauth_server = require('jab-oauth2-server')
  , passport = oauth_server.passport

  , config = require('../config/config.js')
  , mongoose = require('./db')(config)
;

app.config = config;


app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views');
app.use(express.logger('dev'));


// support _method (PUT in forms etc)
app.use(express.methodOverride());
app.use(express.cookieParser());

// parse request bodies (req.body)
app.use(express.bodyParser());

app.use(express.session({ secret: 'keyboard cat' }));
oauth_server.attach(app, {
  dbUsers: mongoose.model('User')
, dbTokens: mongoose.model('Token')
, client_id: config.client.id
, client_secret: config.client.secret
});


app.use(express.favicon(__dirname + '/../public/images/icon/favicon.ico'));

app.use(app.router);

app.use(express.static('public', {maxAge: 24 * 60 * 60 * 1000}));

app.use(express.errorHandler());

app.get('/', function(req, res) {
  var b = new Buffer(config.client.id+':'+config.client.secret).toString('base64');
  res.render('index', {clientinfo: b, env: process.env.NODE_ENV});
});


app.post('/token/validate'
, passport.authenticate('bearer', {session: false})
, function(req, res) {
    res.send('ok');
  }
);

require('./routes')(app, passport, config);


module.exports = app;
