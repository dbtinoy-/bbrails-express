JabberApp.module 'CrewApp', (CrewApp, App, Backbone, Marionette, $, _) ->
  require './list/index.coffee'
  require './new/index.coffee'
  require './edit/index.coffee'
  CrewApp.Router = Marionette.AppRouter.extend(
    appRoutes:
      crew: 'list'
      'crew/:id/edit': 'edit'

    before: ->
      App.vent.trigger 'nav:choose', 'Crew'
      
  )
  API =
    list: ->
      new CrewApp.List.Controller()

    newCrew: (region) ->
      new CrewApp.New.Controller(region: region)

    edit: (id, member) ->
      new CrewApp.Edit.Controller(
        id: id
        crew: member
      )
      

  App.commands.setHandler 'new:crew:member', (region) ->
    API.newCrew region

  App.vent.on 'crew:member:clicked crew:created', (member) ->
    App.navigate [
      'crew/'
      member.id
      '/edit'
    ].join('')
    API.edit member.id, member
    

  App.vent.on 'crew:cancelled crew:updated', (member) ->
    App.navigate 'crew'
    API.list()
    

  App.vent.on 'crew:'
  App.addInitializer ->
    new CrewApp.Router(controller: API)
    

  
