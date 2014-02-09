JabberApp.module 'AdminApp', (AdminApp, App, Backbone, Marionette, $, _) ->
  require './list/list.coffee'
  AdminApp.Router = Marionette.AppRouter.extend(appRoutes:
    admin: 'list'
  )
  API = list: (nav) ->
    App.vent.trigger 'nav:choose', 'Admin'
    new AdminApp.List.Controller(
      nav: nav
      auth: 'default'
    )

  App.commands.setHandler 'admin:list', (nav) ->
    API.list nav
    return

  App.addInitializer ->
    new AdminApp.Router(controller: API)
    return

  return
