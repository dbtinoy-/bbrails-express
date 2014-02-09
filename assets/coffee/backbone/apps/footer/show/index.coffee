require './view.coffee'
JabberApp.module 'FooterApp.Show', (Show, App, Backbone, Marionette, $, _) ->
  Show.Controller = App.Controllers.Application.extend(
    initialize: ->
      showView = @getShowView()
      @show showView
      

    getShowView: ->
      new Show.Footer()
  )
  
