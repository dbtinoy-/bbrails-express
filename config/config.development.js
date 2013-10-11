/*jshint node:true*/

module.exports = {
  port: 3000
, host: 'localhost'
, client: {
    id: 'james'
  , secret: '007'
  }
, user: {
    login: 'bob'
  , pwd: 'secret'
  }

, db: 'mongodb://localhost/bbrails_express_redraw'
};


if (module === require.main) {
  // just show the configs
  console.log(exports);
  process.exit(0);
}