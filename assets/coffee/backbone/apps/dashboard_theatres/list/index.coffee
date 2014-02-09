require './view.coffee'
JabberApp.module 'DashboardTheatreApp.List', (List, App, Backbone, Marionette, $, _) ->
  List.Controller = App.Controllers.Application.extend(
    initialize: ->
      theatres = App.request('theatre:movie:entities')
      theaterView = @getTheatreView(theatres)
      @show theaterView,
        loading: true

      

    getTheatreView: (theatres) ->
      new List.Theatres(collection: theatres)
  )
  
