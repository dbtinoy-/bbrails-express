
JabberApp.module('AdminLocationsApp.New', function(New, App, Backbone, Marionette, $, _) {
  require('./new.view.js');

  New.Controller = App.Controllers.Application.extend({
    name: 'AdminLocationsApp.New'

  , initialize: function(options) {
      var locations = options.locations;
      var location  = App.request('new:location:entity');
      var newView   = this.getNewView(locations, location);

      this.listenTo(newView, 'show', function() {
      });

      this.show(newView);
    }


  , getNewView: function(locations, location) {
      return new New.Location({ collection: locations, model: location });
    }

  });

});