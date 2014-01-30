
JabberApp.module('AdminLocationsApp.List', function(List, App, Backbone, Marionette, $, _) {
  require('./list.view.js');

  List.Controller = App.Controllers.Application.extend({
    name: 'AdminLocationsApp.List'

  , initialize: function(options) {
      var locations = App.request('location:entities');

      this.layout = this.getLayoutView();

      this.listenTo(this.layout, 'show', function() {
        this.panelRegion(locations);
        this.locationsRegion(locations);
      });

      this.show(this.layout, { loading: { entities: locations } });
    }


  , panelRegion: function(locations) {
      var panelView = this.getPanelView();

      this.listenTo(panelView, 'new:location:clicked', function() {
        App.vent.trigger('new:location:clicked', locations);
      });

      this.show(panelView, { region: this.layout.panelRegion });
    }

  , locationsRegion: function(locations) {
      var listView = this.getListView(locations);

      this.listenTo(listView, 'childview:destroy:location:clicked', function(iv, args) {
        var model = args.model;

        if ( confirm('Are you sure you want to delete : '+model.get('name') ) ) {
          model.destroy();
        }
      })


      this.show(listView, { region: this.layout.locationsRegion });
    }


  , getPanelView: function() {
      return new List.Panel();
    }


  , getListView: function(locations) {
      return new List.Locations({ collection: locations });
    }

  , getLayoutView: function() {
      return new List.Layout();
    }



  });

});