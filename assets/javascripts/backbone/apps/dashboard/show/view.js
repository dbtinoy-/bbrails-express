JabberApp.module('DashboardApp.Show', function(Show, App, Backbone, Marionette, $, _) {

  Show.Layout = App.Views.Layout.extend({
    template: require('./tpl/layout.hbs')
  , regions: {
      upcomingRegion: '#upcoming-region'
    , theatreRegion: '#theatre-region'
    }
  });
});