require('./view');

JabberApp.module('SearchApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Controller = App.Controllers.Application.extend({
    initialize: function(options) {
      this.layout = this.getLayoutView();

      this.listenTo(this.layout, 'show', function() {
        this.panelView();
        this.moviesView();
      });

      this.show(this.layout);
    }

  , panelView: function() {
      var panelView = this.getPanelView();

      this.listenTo(panelView, 'search:submitted', function(searchTerm) {
        this.moviesView(searchTerm);
      });

      this.show(panelView, { region: this.layout.panelRegion });

      // this.layout.panelRegion.show(panelView);
    }

  , moviesView: function(searchTerm) {
      if (searchTerm) {
        this.searchView(searchTerm);
      } else {
        this.showHeroView();
      }
    }

  , searchView: function(searchTerm) {
      var movies = App.request('search:movie:entities', searchTerm)
        , moviesView = this.getMoviesView(movies)
        , opts = {
            region: this.layout.moviesRegion
          , loading: true
          };

      if (this.layout.moviesRegion.currentView !== this.heroView) {
        opts.loading = { loadingType: 'opacity' };
      }

      this.show(moviesView, opts);
      // this.layout.moviesRegion.show(moviesView);
    }

  , showHeroView: function() {
      this.heroView = this.getHeroView();
      this.show(this.heroView, { region: this.layout.moviesRegion });
      // this.layout.moviesRegion.show(heroView);
    }

  , getHeroView: function() {
      return new List.Hero();
    }

  , getMoviesView: function(movies) {
      return new List.Movies({ collection: movies });
    }

  , getPanelView: function() {
      return new List.Panel();
    }

  , getLayoutView: function() {
      return new List.Layout();
    }
  });

});