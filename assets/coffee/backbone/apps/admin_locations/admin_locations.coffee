JabberApp.module 'AdminLocationsApp', (AdminLocationsApp, App, Backbone, Marionette, $, _) ->
  require './new/new.coffee'
  require './list/list.coffee'
  AdminLocationsApp.Router = Marionette.AppRouter.extend(appRoutes:
    'admin/locations': 'list'
  )
  API =
    list: (region) ->
      return App.execute('admin:list', 'Locations')  unless region
      new AdminLocationsApp.List.Controller(
        region: region
        auth: 'default'
      )

    newLocation: (locations) ->
      new AdminLocationsApp.New.Controller(
        locations: locations
        region: App.dialogRegion
      )

  App.vent.on 'admin:nav:chose', (nav, region) ->
    return  unless nav is 'Locations'
    App.navigate 'admin/locations'
    API.list region
    return

  App.vent.on 'new:location:clicked', (locations) ->
    API.newLocation locations
    return

  App.addInitializer ->
    new AdminLocationsApp.Router(controller: API)
    return

  return
