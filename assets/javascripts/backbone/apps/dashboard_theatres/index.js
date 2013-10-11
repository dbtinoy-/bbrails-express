require('./list');

JabberApp.module('DashboardTheatreApp', function(DashboardTheatreApp, App, Backbone, Marionette, $, _) {
  var API = {
    list: function(region) {
      return new DashboardTheatreApp.List.Controller({ region: region });
    }
  };

  App.commands.setHandler('list:dashboad:theater:movies', function(region) {
    return API.list(region);
  });
});