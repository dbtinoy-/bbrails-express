JabberApp.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {


  var Location = Entities.Model.extend({
    urlRoot: 'admin/locations'

  , dangerLookups: { low: 'success', medium: 'warning', high: 'danger' }
  , mutators: {
      dangerClass: function() {
        if (!this.get('danger')) return;
        return this.dangerLookups[this.get('danger')];
      }

    , dangerFormatted: function() {
        var d = this.get('danger');
        if (!d) return;
        return _.capitalize(d);
      }
    }
  });


  var LocationCollection = Entities.Collection.extend({
    model: Location
  , url: 'admin/locations'
  , comparator: function(m) {
      return m.get('name').toLowerCase();
    }
  });


  var API = {
    getNewLocation: function() {
      return new Location();
    }


  , getLocations: function() {
      var location = new LocationCollection();
      location.fetch({reset: true});
      return location;
    }

  };



  App.reqres.setHandler('location:entities', function() {
    return API.getLocations();
  });

  App.reqres.setHandler('new:location:entity', function() {
    return API.getNewLocation();
  });


});