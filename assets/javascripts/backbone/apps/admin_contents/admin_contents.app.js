

JabberApp.module('AdminContentsApp', function(AdminContentsApp, App, Backbone, Marionette, $, _) {
  require('./list/list.ctrl.js');

  AdminContentsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'admin/contents':   'list'
    }
  });

  var API = {
    list: function(region) {
      if (!region) return App.execute('admin:list', 'Contents');

      return new AdminContentsApp.List.Controller({
        region: region
      , auth: 'default'
      });
    }
  };

  App.vent.on('admin:nav:chose', function(nav, region) {
    if (nav != 'Contents') return;
    API.list(region);
    App.navigate('admin/contents');
  });

  App.addInitializer(function() {
    new AdminContentsApp.Router({
      controller: API
    });
  });

});