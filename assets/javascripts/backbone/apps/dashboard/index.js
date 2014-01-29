require('./show');

JabberApp.module('DashboardApp', function(DashboardApp, App, Backbone, Marionette, $, _) {

  DashboardApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'dashboard': 'show'
    }
  });

  var API = {
    show: function() {
      App.vent.trigger('nav:choose', 'Dashboard');
      return new DashboardApp.Show.Controller();
    }
  };

  App.addInitializer(function() {
    return new DashboardApp.Router({ controller: API });
  });
});