require './list/index.coffee'
JabberApp.module 'DashboardTheatreApp', (DashboardTheatreApp, App, Backbone, Marionette, $, _) ->
  API = list: (region) ->
    new DashboardTheatreApp.List.Controller(region: region)

  App.commands.setHandler 'list:dashboad:theater:movies', (region) ->
    API.list region

  
