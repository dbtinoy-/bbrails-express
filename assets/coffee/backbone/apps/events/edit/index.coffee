require './view.coffee'
JabberApp.module 'EventsApp.Edit', (Edit, App, Backbone, Marionette, $, _) ->
  Edit.Controller = App.Controllers.Application.extend(
    initialize: (options) ->
      event = options.event
      editView = @getEditView(event)
      window.editView = editView
      editView.on 'dialog:ok:clicked', ->
        console.log 'dialog:ok:clicked handled by Controller'
        

      @show editView
      

    getEditView: (event) ->
      new Edit.Event(model: event)
  )
  
