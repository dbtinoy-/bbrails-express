JabberApp.module 'AdminRecipientsApp', (AdminRecipientsApp, App, Backbone, Marionette, $, _) ->
  require './list/list.coffee'
  AdminRecipientsApp.Router = Marionette.AppRouter.extend(appRoutes:
    'admin/recipients': 'list'
  )
  API = list: (region) ->
    return App.execute('admin:list', 'Recipients')  unless region
    new AdminRecipientsApp.List.Controller(
      region: region
      auth: 'default'
    )

  App.vent.on 'admin:nav:chose', (nav, region) ->
    return  unless nav is 'Recipients'
    App.navigate 'admin/recipients'
    API.list region
    return

  App.addInitializer ->
    new AdminRecipientsApp.Router(controller: API)
    return

  return
