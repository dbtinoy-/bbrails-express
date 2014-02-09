JabberApp.module 'DeliveriesApp', (DeliveriesApp, App, Backbone, Marionette, $, _) ->
  require './list/list.coffee'
  DeliveriesApp.Router = Marionette.AppRouter.extend(appRoutes:
    deliveries: 'list'
  )
  API = list: ->
    App.vent.trigger 'nav:choose', 'Deliveries'
    new DeliveriesApp.List.Controller(auth: 'default')

  App.addInitializer ->
    new DeliveriesApp.Router(controller: API)
    return

  return
