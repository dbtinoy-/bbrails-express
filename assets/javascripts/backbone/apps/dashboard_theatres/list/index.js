require('./view');

JabberApp.module('DashboardTheatreApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Controller = App.Controllers.Base.extend({
    initialize: function() {
      var theatres = App.request('theatre:movie:entities')
        , theaterView = this.getTheatreView(theatres);

      this.show(theaterView, { loading: true });
    }

  , getTheatreView: function(theatres) {
      return new List.Theatres({ collection: theatres });
    }
  });

});