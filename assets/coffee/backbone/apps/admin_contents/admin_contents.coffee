JabberApp.module 'AdminContentsApp', (AdminContentsApp, App, Backbone, Marionette, $, _) ->
  require './list/list.coffee'
  AdminContentsApp.Router = Marionette.AppRouter.extend(appRoutes:
    'admin/contents': 'list'
  )
  API = list: (region) ->
    return App.execute('admin:list', 'Contents')  unless region
    new AdminContentsApp.List.Controller(
      region: region
      auth: 'default'
    )

  App.vent.on 'admin:nav:chose', (nav, region) ->
    return  unless nav is 'Contents'
    API.list region
    App.navigate 'admin/contents'
    return

  App.addInitializer ->
    new AdminContentsApp.Router(controller: API)
    return

  return
