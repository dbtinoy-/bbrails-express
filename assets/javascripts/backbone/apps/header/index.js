require('./list');

JabberApp.module('HeaderApp', function(HeaderApp, App, Backbone, Marionette, $, _) {
  this.startWithParent = false;

  var API = {
    list: function(navs) {
      return new HeaderApp.List.Controller({
        region: App.headerRegion
      , navs: navs
      });
    }
  };

  this.on('start', function(navs) {
    API.list(navs);
  });

});