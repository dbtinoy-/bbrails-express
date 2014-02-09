require './list/index.coffee'
JabberApp.module 'SearchApp', (SearchApp, App, Backbone, Marionette, $, _) ->
  SearchApp.Router = Marionette.AppRouter.extend(appRoutes:
    search: 'list'
  )
  API = list: ->
    new SearchApp.List.Controller()

  App.addInitializer ->
    new SearchApp.Router(controller: API)

  
