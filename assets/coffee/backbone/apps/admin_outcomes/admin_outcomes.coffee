JabberApp.module 'AdminOutcomesApp', (AdminOutcomesApp, App, Backbone, Marionette, $, _) ->
  require './list/list.coffee'
  AdminOutcomesApp.Router = Marionette.AppRouter.extend(appRoutes:
    'admin/outcomes': 'list'
  )
  API = list: (region) ->
    return App.execute('admin:list', 'Outcomes')  unless region
    new AdminOutcomesApp.List.Controller(
      region: region
      auth: 'default'
    )

  App.vent.on 'admin:nav:chose', (nav, region) ->
    return  unless nav is 'Outcomes'
    App.navigate 'admin/outcomes'
    API.list region
    return

  App.addInitializer ->
    new AdminOutcomesApp.Router(controller: API)
    return

  return
