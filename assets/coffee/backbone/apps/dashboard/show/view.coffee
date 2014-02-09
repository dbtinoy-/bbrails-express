JabberApp.module 'DashboardApp.Show', (Show, App, Backbone, Marionette, $, _) ->
  Show.Layout = App.Views.Layout.extend(
    template: require('./tpl/layout.hbs')
    regions:
      upcomingRegion: '#upcoming-region'
      theatreRegion: '#theatre-region'
  )
  return
