

JabberApp.module('DeliveriesApp', function(DeliveriesApp, App, Backbone, Marionette, $, _) {
  require('./list/list.ctrl.js');

  DeliveriesApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'deliveries':   'list'
    }
  });

  var API = {
    list: function() {
      App.vent.trigger('nav:choose', 'Deliveries');

      return new DeliveriesApp.List.Controller({
        auth: 'default'
      });
    }
  };

  App.addInitializer(function() {
    new DeliveriesApp.Router({
      controller: API
    });
  });

});