require './view.coffee'
JabberApp.module 'CrewApp.New', (New, App, Backbone, Marionette, $, _) ->
  New.Controller = App.Controllers.Application.extend(
    initialize: (options) ->
      crew = App.request('new:crew:entity')
      newView = undefined
      formView = undefined
      @listenTo crew, 'created', ->
        App.vent.trigger 'crew:created', crew
        

      newView = @getNewView(crew)
      formView = App.request('form:wrapper', newView)
      @listenTo newView, 'form:cancel', @closeRegion
      @show formView
      

    closeRegion: ->
      @region.close()
      

    getNewView: (crew) ->
      new New.Crew(model: crew)
  )
  
