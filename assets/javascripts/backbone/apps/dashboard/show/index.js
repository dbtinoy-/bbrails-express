require('./view');

JabberApp.module('DashboardApp.Show', function(Show, App, Backbone, Marionette, $, _) {

  Show.Controller = App.Controllers.Application.extend({
    initialize: function() {
      this.layout = this.getLayoutView();

      this.listenTo(this.layout, 'show', function() {
        this.listUpcoming();
        this.listTheatre();
      });

      this.show(this.layout);
    }

  , listUpcoming: function() {
      App.execute('list:dashboad:upcoming:movies', this.layout.upcomingRegion);
    }

  , listTheatre: function() {
      App.execute('list:dashboad:theater:movies', this.layout.theatreRegion);
    }

  , getLayoutView: function() {
      return new Show.Layout();
    }
  });

});