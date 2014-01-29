

JabberApp.module('AdminRecipientsApp', function(AdminRecipientsApp, App, Backbone, Marionette, $, _) {
  require('./list/list.ctrl.js');

  AdminRecipientsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'admin/recipients':   'list'
    }
  });

  var API = {
    list: function(region) {
      if (!region) return App.execute('admin:list', 'Recipients');

      return new AdminRecipientsApp.List.Controller({
        region: region
      , auth: 'default'
      });
    }
  };



  App.vent.on('admin:nav:chose', function(nav, region) {
    if (nav != 'Recipients') return;

    App.navigate('admin/recipients');
    API.list(region);
  });

  App.addInitializer(function() {
    new AdminRecipientsApp.Router({
      controller: API
    });
  });

});