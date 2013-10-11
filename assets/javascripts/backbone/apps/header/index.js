require('./list');

JabberApp.module('HeaderApp', function(HeaderApp, App, Backbone, Marionette, $, _) {
  this.startWithParent = false;

  var API = {
    list: function() {
      return new HeaderApp.List.Controller({
        region: App.headerRegion
      });
    }
  };

  this.on('start', function() {
    API.list();
  });
});