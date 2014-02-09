require './list/index.coffee'
JabberApp.module 'DashboardUpcomingApp', (DashboardUpcomingApp, App, Backbone, Marionette, $, _) ->
  API = list: (region) ->
    new DashboardUpcomingApp.List.Controller(region: region)

  App.commands.setHandler 'list:dashboad:upcoming:movies', (region) ->
    API.list region

  
