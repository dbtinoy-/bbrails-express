require './show/index.coffee'
JabberApp.module 'DashboardApp', (DashboardApp, App, Backbone, Marionette, $, _) ->
  DashboardApp.Router = Marionette.AppRouter.extend(appRoutes:
    dashboard: 'show'
  )
  API = show: ->
    App.vent.trigger 'nav:choose', 'Dashboard'
    new DashboardApp.Show.Controller()

  App.addInitializer ->
    new DashboardApp.Router(controller: API)

  
