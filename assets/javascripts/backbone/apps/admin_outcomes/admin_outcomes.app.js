

JabberApp.module('AdminOutcomesApp', function(AdminOutcomesApp, App, Backbone, Marionette, $, _) {
  require('./list/list.ctrl.js');

  AdminOutcomesApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'admin/outcomes':   'list'
    }
  });

  var API = {
    list: function(region) {

      if (!region) return App.execute('admin:list', 'Outcomes');

      return new AdminOutcomesApp.List.Controller({
        region: region
      , auth: 'default'
      });
    }
  };


  App.vent.on('admin:nav:chose', function(nav, region) {
    if (nav != 'Outcomes') return;

    App.navigate('admin/outcomes');
    API.list(region);
  });

  App.addInitializer(function() {
    new AdminOutcomesApp.Router({
      controller: API
    });
  });

});