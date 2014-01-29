

JabberApp.module('AdminLocationsApp', function(AdminLocationsApp, App, Backbone, Marionette, $, _) {
  require('./list/list.ctrl.js');

  AdminLocationsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'admin/locations':   'list'
    }
  });

  var API = {
    list: function(region) {
      if (!region) return App.execute('admin:list', 'Locations');

      return new AdminLocationsApp.List.Controller({
        region: region
      , auth: 'default'
      });
    }
  };


  App.vent.on('admin:nav:chose', function(nav, region) {
    if (nav != 'Locations') return;

    App.navigate('admin/locations');
    API.list(region);
  });

  App.addInitializer(function() {
    new AdminLocationsApp.Router({
      controller: API
    });
  });

});