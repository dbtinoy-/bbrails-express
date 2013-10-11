require('./list');

JabberApp.module('DashboardUpcomingApp', function(DashboardUpcomingApp, App, Backbone, Marionette, $, _) {
  var API = {
    list: function(region) {
      return new DashboardUpcomingApp.List.Controller({ region: region });
    }
  };

  App.commands.setHandler('list:dashboad:upcoming:movies', function(region) {
    return API.list(region);
  });
});