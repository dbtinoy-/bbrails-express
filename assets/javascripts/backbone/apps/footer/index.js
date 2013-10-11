require('./show');

JabberApp.module('FooterApp', function(FooterApp, App, Backbone, Marionette, $, _) {
  this.startWithParent = false;

  var API = {
    show: function() {
      return new FooterApp.Show.Controller({
        region: App.footerRegion
      });
    }
  };

  this.on('start', function() {
    API.show();
  });
});