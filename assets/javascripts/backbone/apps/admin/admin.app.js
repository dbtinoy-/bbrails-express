

JabberApp.module('AdminApp', function(AdminApp, App, Backbone, Marionette, $, _) {
  require('./list/list.ctrl.js');

  AdminApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'admin':   'list'
    }
  });

  var API = {
    list: function(nav) {
      App.vent.trigger('nav:choose', 'Admin');

      return new AdminApp.List.Controller({
        nav: nav
      , auth: 'default'
      });
    }
  };

  App.commands.setHandler('admin:list', function(nav) {
    API.list(nav);
  });

  App.addInitializer(function() {
    new AdminApp.Router({
      controller: API
    });
  });

});