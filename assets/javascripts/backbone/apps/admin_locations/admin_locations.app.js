

JabberApp.module('AdminLocationsApp', function(AdminLocationsApp, App, Backbone, Marionette, $, _) {
  require('./new/new.ctrl.js');
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

  , newLocation: function(locations) {
      return new AdminLocationsApp.New.Controller({
        locations: locations
      , region: App.dialogRegion
      });
    }
  };


  App.vent.on('admin:nav:chose', function(nav, region) {
    if (nav != 'Locations') return;

    App.navigate('admin/locations');
    API.list(region);
  });


  App.vent.on('new:location:clicked', function(locations) {
    API.newLocation(locations);
  });



  App.addInitializer(function() {
    new AdminLocationsApp.Router({
      controller: API
    });
  });

});