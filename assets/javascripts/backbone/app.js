require('./config');

var App = global.JabberApp = new Backbone.Marionette.Application();

require('./controllers');
require('./views');
require('./components');
require('./entities');
require('./apps');

App.addRegions({
  headerRegion: '#header-region'
, mainRegion:   '#main-region'
, footerRegion: '#footer-region'
, dialogRegion: Backbone.Marionette.Region.Dialog.extend({el: '#dialog-region', dialogWrapper: function(view) {
    return App.request('dialog:wrapper', view);
  }})
});

App.rootRoute = 'crew';

App.on('initialize:before', function(options) {
  if (!options.environment) throw new Error('environment must be set');
  App.environment = options.environment;
});

App.addInitializer(function() {
  this.module('HeaderApp').start();
  this.module('FooterApp').start();
});


App.reqres.setHandler('default:region', function() {
  return App.mainRegion;
});

App.commands.setHandler('register:instance', function(instance, id) {
  if (App.environment == 'development') {
    App.register(instance, id);
  }
});

App.commands.setHandler('unregister:instance', function(instance, id) {
  if (App.environment == 'development') {
    App.unregister(instance, id);
  }
});

App.on('initialize:after', function() {
  this.startHistory();
  if (!this.getCurrentRoute()) {
    this.navigate(this.rootRoute, {trigger: true});
  }
});