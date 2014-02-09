require './view.coffee'
JabberApp.module 'DashboardApp.Show', (Show, App, Backbone, Marionette, $, _) ->
  Show.Controller = App.Controllers.Application.extend(
    initialize: ->
      @layout = @getLayoutView()
      @listenTo @layout, 'show', ->
        @listUpcoming()
        @listTheatre()
        

      @show @layout
      

    listUpcoming: ->
      App.execute 'list:dashboad:upcoming:movies', @layout.upcomingRegion
      

    listTheatre: ->
      App.execute 'list:dashboad:theater:movies', @layout.theatreRegion
      

    getLayoutView: ->
      new Show.Layout()
  )
  
