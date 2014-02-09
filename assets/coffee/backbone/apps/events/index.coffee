require './list/index.coffee'
require './edit/index.coffee'
JabberApp.module 'EventsApp', (EventsApp, App, Backbone, Marionette, $, _) ->
  EventsApp.Router = Marionette.AppRouter.extend(appRoutes:
    events: 'list'
  )
  
  # , 'events/:id/edit':  'edit'
  API =
    list: ->
      new EventsApp.List.Controller()

    edit: (event) ->
      new EventsApp.Edit.Controller(
        event: event
        region: App.dialogRegion
      )

  App.addInitializer ->
    new EventsApp.Router(controller: API)
    

  App.vent.on 'edit:event:clicked', (event) ->
    API.edit event
    

  
