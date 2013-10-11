require('./view');

JabberApp.module('RentalsApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Controller = App.Controllers.Base.extend({
    initialize: function() {
      var rentals = App.request('movie:rental:entities');

      App.execute('when:fetched', rentals, function() {
        rentals.reset(rentals.sortBy('runtime'));
      });


      this.layout = this.getLayoutView();

      this.listenTo(this.layout, 'show', function() {
        this.resultsView(rentals);
        this.rentalsView(rentals);
        this.paginationView(rentals);
      });

      this.show(this.layout, {
        loading: {
          entities: rentals
        }
      });
    }

  , resultsView: function(rentals) {
      var resultsView  = this.getResultsView(rentals);
      this.layout.resultsRegion.show(resultsView);
    }

  , rentalsView: function(rentals) {
      var rentalsView = this.getRentalsView(rentals);
      this.layout.rentalsRegion.show(rentalsView);
    }

  , paginationView: function(rentals) {
      var paginationView = this.getPaginationView(rentals);
      this.layout.paginationRegion.show(paginationView);
    }

  , getResultsView: function(rentals) {
      return new List.Results({ collection: rentals });
    }

  , getRentalsView: function(rentals) {
      return new List.Rentals({ collection: rentals });
    }

  , getPaginationView: function(rentals) {
      return new List.Pagination({ collection: rentals });
    }

  , getLayoutView: function() {
      return new List.Layout();
    }

  , layoutShow: function() {

    }
  });


});