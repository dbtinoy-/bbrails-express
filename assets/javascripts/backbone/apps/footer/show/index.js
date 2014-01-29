require('./view');

JabberApp.module('FooterApp.Show', function(Show, App, Backbone, Marionette, $, _) {
  Show.Controller = App.Controllers.Application.extend({
    initialize: function() {
      var showView = this.getShowView();
      this.show(showView);
    }

  , getShowView: function() {
      return new Show.Footer();
    }
  });
});