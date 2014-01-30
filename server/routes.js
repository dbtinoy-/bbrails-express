/* jshint node:true */

var users         = require('./controllers/users');
var crew          = require('./controllers/crew');
var locations     = require('./controllers/locations.sctrl');
var accounts      = require('./controllers/accounts');
var organizations = require('./controllers/organizations');

function authenticate(passport) {
  return passport.authenticate('bearer', {session: false});
}

function routes(app, passport, config) {
  var auth = authenticate(passport);

  app.get('/', function(req, res) {
    var b = new Buffer(config.client.id+':'+config.client.secret).toString('base64');
    res.render('index', {clientinfo: b});
  });


  app.post('/token/validate'
  , auth
  , function(req, res) {
      res.send('ok');
    }
  );

  app.get('/me', auth, accounts.me);


  app.post('/organizations', auth, organizations.post);
  app.get('/users', users.all);

  app.get('/crew',      crew.all);
  app.get('/crew/:id',  crew.show);
  app.put('/crew/:id',  crew.update);
  app.post('/crew',     crew.create);
  app.del('/crew/:id',  crew.destroy);


  app.get('/admin/locations', locations.all);
  app.del('/admin/locations/:id', locations.destroy);
}


module.exports = routes;