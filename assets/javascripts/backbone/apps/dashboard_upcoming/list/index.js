require('./view');

JabberApp.module('DashboardUpcomingApp.List', function(List, App, Backbone, Marionette, $, _) {

  List.Controller = App.Controllers.Base.extend({
    initialize: function() {
      var upcomings = App.request('upcoming:movie:entities')
        , upcompingView = this.getUpcomingView(upcomings);

      this.show(upcompingView, { loading: true });
    }

  , getUpcomingView: function(upcomings) {
      return new List.Upcomings({ collection: upcomings });
    }
  });

});