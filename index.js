/* jshint node:true*/
var app = require('./server');

if (!module.parent) {
  app.listen(app.config.port, function() {
    console.log('Running on http://localhost:3000');
  });
}
