require './list/index.coffee'
JabberApp.module 'RentalsApp', (RentalsApp, App, Backbone, Marionette, $, _) ->
  RentalsApp.Router = Marionette.AppRouter.extend(appRoutes:
    rentals: 'list'
  )
  API = list: ->
    new RentalsApp.List.Controller()

  App.addInitializer ->
    new RentalsApp.Router(controller: API)

  
