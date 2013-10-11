require('./list');
require('./edit');

JabberApp.module('EventsApp', function(EventsApp, App, Backbone, Marionette, $, _) {

  EventsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'events':           'list'
    // , 'events/:id/edit':  'edit'
    }
  });

  var API = {
    list: function() {
      return new EventsApp.List.Controller();
    }

  , edit: function(event) {
      return new EventsApp.Edit.Controller({
        event: event
      , region: App.dialogRegion
      });
    }
  };

  App.addInitializer(function() {
    new EventsApp.Router({
      controller: API
    });
  });


  App.vent.on('edit:event:clicked', function(event) {
    API.edit(event);
  });

});