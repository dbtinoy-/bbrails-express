require('../config');

var App = global.JabberApp = new Backbone.Marionette.Application();


App.addRegions({
  headerRegion: '#header-region'
, mainRegion:   '#main-region'
, footerRegion: '#footer-region'
// , dialogRegion: Backbone.Marionette.Region.Dialog.extend({el: '#dialog-region', dialogWrapper: function(view) {
//     return App.request('dialog:wrapper', view);
//   }})
});

App.rootRoute = 'crew';

App.on('initialize:before', function(options) {
  if (!options.environment) throw new Error('environment must be set');

  App.environment = options.environment;
  App.navs        = App.request('nav:entities');
});


App.addInitializer(function() {
  this.module('HeaderApp').start(App.navs);
  this.module('FooterApp').start();
});

App.vent.on('nav:choose', function(nav) { App.navs.chooseByName(nav); });

App.reqres.setHandler('default:region', function() { return App.mainRegion; });


App.on('initialize:after', function() {
  // create our specialized dialog region
  // in initialize:after ensure App.Regions.Dialog is correctly initialized and present
  this.addRegions({ dialogRegion: { selector: '#dialog-region', regionType: App.Regions.Dialog } });

  this.startHistory();

  if (!this.getCurrentRoute()) {
    this.navigate(this.rootRoute, {trigger: true});
  }

});

require('./lib');
require('./entities');
require('./apps');
